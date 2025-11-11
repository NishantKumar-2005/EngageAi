import { NextRequest } from "next/server";
import { db } from "src/db";
import { meetings } from "src/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "src/lib/auth";

export const runtime = "edge"; // prefer edge for lower latency

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });
    if (!session || !session.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const body = await req.json().catch(() => null);
    if (!body) {
      return new Response(JSON.stringify({ error: "Invalid JSON body" }), { status: 400 });
    }

    const { meetingId, message, history } = body as {
      meetingId: string;
      message: string;
      history?: { role: "user" | "assistant"; content: string }[];
    };

    if (!meetingId || !message) {
      return new Response(JSON.stringify({ error: "meetingId and message are required" }), { status: 400 });
    }

    const [existingMeeting] = await db
      .select()
      .from(meetings)
      .where(eq(meetings.id, meetingId));

    if (!existingMeeting) {
      return new Response(JSON.stringify({ error: "Meeting not found" }), { status: 404 });
    }

    const summary = existingMeeting.summary?.trim();
    const systemBase = `You are an AI assistant helping the user after a meeting. Use the meeting summary as context. If something is not in the summary, answer based on general knowledge but clearly state uncertainty. Keep answers concise and helpful.`;
    const systemWithSummary = summary
      ? `${systemBase}\n\n<meeting_summary>\n${summary}\n</meeting_summary>`
      : `${systemBase}\n\n(No summary available yet.)`;

    if (!process.env.OPENAI_API_KEY) {
      return new Response(JSON.stringify({ error: "OPENAI_API_KEY not configured" }), { status: 500 });
    }

    const messages = [
      { role: "system", content: systemWithSummary },
      ...(history || []).map((h) => ({ role: h.role, content: h.content })),
      { role: "user", content: message },
    ];

    const completionRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.5,
        max_tokens: 600,
        messages,
      }),
    });

    const json = await completionRes.json();
    if (!completionRes.ok) {
      return new Response(
        JSON.stringify({ error: json?.error?.message || "OpenAI request failed" }),
        { status: completionRes.status }
      );
    }

    const reply = json?.choices?.[0]?.message?.content?.trim() || "";
    return new Response(JSON.stringify({ reply }), { status: 200 });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return new Response(JSON.stringify({ error: message }), { status: 500 });
  }
}