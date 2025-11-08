import { 
    CallEndedEvent,
    CallRecording,
    CallRecordingReadyEvent,
    CallSessionParticipantLeftEvent,
    CallSessionStartedEvent,
    CallTranscriptionReadyEvent
 } from "@stream-io/node-sdk";

 import {and , eq} from "drizzle-orm";
 import { db } from "src/db";
 import { meetings,agents } from "src/db/schema";
 import { streamVideo } from "src/lib/stream-video";
 import { NextRequest, NextResponse } from "next/server";
import { inngest } from "src/inngest/client";

 function verifySignatureWithSDK(body:string , signature:string ):boolean{
    return streamVideo.verifyWebhook(body,signature);
 }

 export async function POST(request:NextRequest){
    
    const signature = request.headers.get("x-signature");
    const apiKey = request.headers.get("x-api-key");
    
    console.log("📝 Headers received:", {
        hasSignature: !!signature,
        hasApiKey: !!apiKey,
        userAgent: request.headers.get("user-agent")
    });
    
    if(!signature || !apiKey){
        console.error("❌ Missing signature or API key in headers");
        return NextResponse.json(
            {error: "Missing signature or api key"},
            {status: 400}
        );
    }
    
    // Get raw body as text for signature verification
    const rawBody = await request.text();
    console.log("📦 Raw body length:", rawBody.length);
    
    if (!verifySignatureWithSDK(rawBody, signature)) {
        console.error("❌ Signature verification failed");
        return NextResponse.json(
            {error: "Invalid signature"},
            {status: 401}
        );
    }
    
    console.log("✅ Signature verified successfully");
    
    // Parse the body as JSON
    let payload : unknown;
    try{
        payload = JSON.parse(rawBody) as Record<string,unknown>;
        console.log("📋 Parsed payload:", JSON.stringify(payload, null, 2));
    }
    catch(err){
        console.error("❌ Failed to parse JSON:", err);
        return NextResponse.json(
            {error: "Invalid payload"},
            {status: 400}
        );
    }

    const eventType = (payload as Record<string,unknown>)?.type;
    console.log("🎯 Event type:", eventType);

    if(eventType === "call.session_started"){
        console.log("📞 Processing call.session_started event");
        
        const event = payload as CallSessionStartedEvent;
        const meetingId = event.call.custom?.meetingId as string;


        if(!meetingId){
            console.error(`❌ No meeting_id found in call.custom ${JSON.stringify(event.call.custom)}`);
            return NextResponse.json({error: "Missing meeting id"}, {status: 400});
        }
        
        console.log("🔍 Looking for meeting with ID:", meetingId);
        
        const [existingMeeting] = await db
        .select()
        .from(meetings)
        .where(
            and(
                eq(meetings.id, meetingId),
                eq(meetings.status, "upcomming")
            )
        );
        
        console.log("📅 Meeting found:", !!existingMeeting);
        
        if(!existingMeeting){
            // Check if meeting exists with different status
            const meetingAnyStatus = await db.select().from(meetings).where(eq(meetings.id, meetingId));
            console.log("🔍 Meeting exists with any status:", meetingAnyStatus.length > 0);
            if (meetingAnyStatus.length > 0) {
                console.log("📋 Meeting current status:", meetingAnyStatus[0].status);
            }
            return NextResponse.json({error: "Meeting not found or not in upcoming status"}, {status: 404});
        }
        
        await db
        .update(meetings)
        .set({status: "active",
            startedAt: new Date(),
        })
        .where(eq(meetings.id, meetingId));

        const [existingAgent] = await db
        .select()
        .from(agents)
        .where(
            eq(agents.id, existingMeeting.agentId)
        );

        console.log("🤖 Found agent:", existingAgent ? existingAgent.name : "No");

        if(!existingAgent){
            console.error("❌ Agent not found for ID:", existingMeeting.agentId);
            return NextResponse.json({error: "Agent not found"}, {status: 404});
        }

        if (!process.env.OPENAI_API_KEY) {
            console.error("❌ OpenAI API key not configured");
            return NextResponse.json({error: "OpenAI API key not configured"}, {status: 500});
        }

        console.log("🚀 Attempting to connect AI agent to call...");
        console.log("📋 Agent instructions:", existingAgent.instructions);

        try {
            const call = streamVideo.video.call("default", meetingId);
            console.log("📞 Created call instance for meeting:", meetingId);
            
            // First, make sure the agent user exists and joins the call
            console.log("👤 Adding agent as participant to call...");
            
            const realtimeClient = await streamVideo.video.connectOpenAi({
                call,
                openAiApiKey: process.env.OPENAI_API_KEY,
                agentUserId: existingAgent.id,
            });
            
            console.log("✅ Connected OpenAI to call successfully");

            // Update the session with agent instructions
            await realtimeClient.updateSession({
                instructions: existingAgent.instructions || "You are a helpful AI assistant in a video call. Be conversational and engaging.",
            });
            
            console.log("✅ Updated session with agent instructions");
            console.log("🎉 AI Agent successfully joined the call and is ready to interact!");
            
            return NextResponse.json({
                success: true, 
                message: "AI agent joined call successfully",
                meetingId,
                agentId: existingAgent.id
            }, {status: 200});
            
        } catch (error) {
            console.error("❌ Failed to connect OpenAI to call:", error);
            console.error("Error stack:", error instanceof Error ? error.stack : "No stack trace");
            return NextResponse.json({error: `Failed to start AI agent: ${error instanceof Error ? error.message : 'Unknown error'}`}, {status: 500});
        }

    }
    else if(eventType === "call.session_participant_left"){
        const event = payload as CallSessionParticipantLeftEvent;
        const meetingId = event.call_cid.split(":")[1];

        if(!meetingId){
            return NextResponse.json({error: "Missing meeting id"}, {status: 400});
        }

        const call = streamVideo.video.call("default", meetingId);
        await call.end();
       }  else if(eventType === "call.session_ended"){
          const event = payload as CallEndedEvent;
          const meetingId = event.call.custom?.meetingId;

          if(!meetingId){
           return NextResponse.json({error: "Missing meeting id"}, {status: 400});
    }
    await db 
    .update(meetings)
    .set({
        status: "processing",
        endedAt: new Date(),
    })
    .where(and(eq(meetings.id, meetingId),eq(meetings.status,"active")));
    
    }else if(eventType === "call.transcription_ready"){
         const event = payload as CallTranscriptionReadyEvent;
         const meetingId = event.call_cid.split(":")[1];

         const [updatedMeeting] = await db

            .update(meetings)
            .set({
                transcriptUrl: event.call_transcription.url,
            })
            .where(eq(meetings.id, meetingId))
            .returning();

        if(!updatedMeeting){
          return NextResponse.json({error: "Meeting not found"}, {status: 404});
        }
        await inngest.send({
            name: "meetings/processing",
            data: {
                meetingId : updatedMeeting.id,
                transcriptUrl : updatedMeeting.transcriptUrl,
            },
        });
    } else if(eventType === "call.recording_ready"){


        const event = payload as CallRecordingReadyEvent;
         const meetingId = event.call_cid.split(":")[1];
        
         await db
            .update(meetings)
            .set({
                recordingUrl: event.call_recording.url,
            })
            .where(eq(meetings.id, meetingId));
    }


    return NextResponse.json({status:"ok"});

            
}

