import { eq, inArray } from "drizzle-orm";
import JSONL from "jsonl-parse-stringify"
import { db } from "src/db";
import { agents, meetings, user } from "src/db/schema";
import { createAgent , openai } from "@inngest/agent-kit";

import { inngest } from "src/inngest/client";
import { StreamTranscriptItem } from "src/modules/meetings/types";
import { models } from "inngest";


// Note: The agent must be created within the Inngest function's execution
// so that @inngest/agent-kit can access the step context.


export const meetingsProcessing = inngest.createFunction(
{ id: "meetings/processing" },
{ event: "meetings/processing" },
async ({ event, step }) => {
// Create the agent inside the function to ensure step context is available
const systemPrompt = `
     You are an expert summarizer. You write readable, concise, simple content. You are given a transcript of a meeting and you need to summarize it.

      Use the following markdown structure for every output:

      ### Overview
      Provide a detailed, engaging summary of the session's content. Focus on major features, user workflows, and any key takeaways. Write in a narrative style, using full sentences. Highlight unique or powerful aspects of the product, platform, or discussion.

      ### Notes
      Break down key content into thematic sections with timestamp ranges. Each section should summarize key points, actions, or demos in bullet format.

      Example:
      #### Section Name
      - Main point or demo shown here
      - Another key insight or interaction
      - Follow-up tool or explanation provided

      #### Next Section
      - Feature X automatically does Y
      - Mention of integration with Z
  `.trim();

const summarizer = createAgent({
  name: "summarizer",
  system: systemPrompt,
  model: openai({ model: "gpt-4o-mini", apiKey: process.env.OPENAI_API_KEY }),
});

// Ensure OpenAI is configured
if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is not set; cannot run summarizer.");
}

const response = await step.run("fetch-transcript", async () => {
  return fetch(event.data.transcriptUrl).then((res) => res.text());
});

const transcript = await step.run("parse-transcript", async () => {
return JSONL.parse<StreamTranscriptItem>(response) ;
});

const transcriptWithSpeakers = await step.run("add-speakers", async () => {
  const speakerIds = [
    ...new Set (transcript.map((item) => item.speaker_id)),
  ];

    const userSpeakers = await db
     .select()
     .from(user)
     .where(inArray(user.id, speakerIds))
     .then((users) =>
      users.map((user) => ({
     ...user,
      }))
    );

     const agentSpeakers = await db
     .select()
     .from(agents)
     .where(inArray(agents.id, speakerIds))
     .then((agents) =>
      agents.map((agent) => ({
     ...agent,
      }))
    );

    const speakers = [...userSpeakers, ...agentSpeakers];

     return transcript.map((item) => {
        const speaker = speakers.find(
        (speaker) => speaker. id === item.speaker_id
        );

        if (!speaker) {
        return {
          ...item,
        user: {
        name: "Unknown",
        },
      };
    }

    return{
      ...item,
      user:{
        name:speaker.name,
       },
      };
    })
  });


const summaryText = await step.run("generate-summary", async () => {
  console.log("Generating summary with transcript length:", transcriptWithSpeakers.length);
  try {
    const result = await summarizer.run(
      "Summarize the following transcript: " +
        JSON.stringify(transcriptWithSpeakers, null, 2),
      { step }
    );
    const msgs = Array.isArray(result.output) ? result.output : [];
    const text = msgs.length > 0 && msgs[0]?.type === "text"
      ? (typeof msgs[0].content === "string" ? msgs[0].content : Array.isArray(msgs[0].content) ? msgs[0].content.map((c:any)=>c.text).join("") : "")
      : "";
    if (text && text.trim().length > 0) return text.trim();
    // If unexpected structure, fall back to joining all text outputs
    const joined = msgs
      .filter((m:any)=>m.type === "text")
      .map((m:any)=> typeof m.content === "string" ? m.content : Array.isArray(m.content) ? m.content.map((c:any)=>c.text).join("") : "")
      .join("\n\n");
    if (joined.trim().length > 0) return joined.trim();
    throw new Error("Empty agent output");
  } catch (err) {
    console.warn("Agent-kit failed; falling back to direct OpenAI:", err instanceof Error ? err.message : String(err));
    // Direct OpenAI fallback
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.3,
        max_tokens: 800,
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content:
              "Summarize the following transcript: " +
              JSON.stringify(transcriptWithSpeakers, null, 2),
          },
        ],
      }),
    });
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json?.error?.message || "OpenAI chat failed");
    }
    const text = json?.choices?.[0]?.message?.content?.trim() || "";
    if (!text) throw new Error("OpenAI returned empty content");
    return text;
  }
});

  await step.run("save-summary", async () => {
    console.log("Saving summary for meeting:", event.data.meetingId);
    await db
      .update(meetings)
      .set({ summary: summaryText, status: "completed" })
      .where(eq(meetings.id, event.data.meetingId));
  });
 },
);