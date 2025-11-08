import { 
    CallSessionParticipantLeftEvent,
    CallSessionStartedEvent
 } from "@stream-io/node-sdk";

 import {and , eq} from "drizzle-orm";
 import { db } from "src/db";
 import { meetings,agents } from "src/db/schema";
 import { streamVideo } from "src/lib/stream-video";
 import { NextRequest, NextResponse } from "next/server";

 function verifySignatureWithSDK(body:string , signature:string ):boolean{
    return streamVideo.verifyWebhook(body,signature);
 }

 export async function POST(request:NextRequest){
    
    const signature = request.headers.get("x-signature");
    const apiKey = request.headers.get("x-api-key");
    
    if(!signature || !apiKey){
        return NextResponse.json(
            {error: "Missing signature or api key"},
            {status: 400}
        );
    }
    
    // Get raw body as text for signature verification
    const rawBody = await request.text();
    
    
    if (!verifySignatureWithSDK(rawBody, signature)) {
        
        return NextResponse.json(
            {error: "Invalid signature"},
            {status: 401}
        );
    }
    
    
    // Parse the body as JSON
    let payload : unknown;
    try{
        payload = JSON.parse(rawBody) as Record<string,unknown>;
    }
    catch(err){
        return NextResponse.json(
            {error: "Invalid payload"},
            {status: 400}
        );
    }

    const eventType = (payload as Record<string,unknown>)?.type;

    if(eventType === "call.session_started"){
        
        const event = payload as CallSessionStartedEvent;
        const meetingId = event.call.custom?.meetingId as string;

        if(!meetingId){
            return NextResponse.json({error: "Missing meeting id"}, {status: 400});
        }
        
        const [existingMeeting] = await db
        .select()
        .from(meetings)
        .where(
            and(
                eq(meetings.id, meetingId),
                eq(meetings.status, "upcomming")
            )
        );

        
        if(!existingMeeting){
            // Check if meeting exists with different status
            
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

        

        if(!existingAgent){
            
            return NextResponse.json({error: "Agent not found"}, {status: 404});
        }

        if (!process.env.OPENAI_API_KEY) {
            
            return NextResponse.json({error: "OpenAI API key not configured"}, {status: 500});
        }

        try {
            const call = streamVideo.video.call("default", meetingId);
            
            const realtimeClient = await streamVideo.video.connectOpenAi({
                call,
                openAiApiKey: process.env.OPENAI_API_KEY,
                agentUserId: existingAgent.id,
            });


            // Update the session with agent instructions
            await realtimeClient.updateSession({
                instructions: existingAgent.instructions || "You are a helpful AI assistant in a video call. Be conversational and engaging.",
            });

            
            return NextResponse.json({
                success: true, 
                message: "AI agent joined call successfully",
                meetingId,
                agentId: existingAgent.id
            }, {status: 200});
            
        } catch (error) {
            return NextResponse.json({error: `Failed to start AI agent: ${error instanceof Error ? error.message : 'Unknown error'}`}, {status: 500});
        }

    }
    else if(eventType === "call.session_participant_left"){
        const event = payload as CallSessionParticipantLeftEvent;
        const meetingId = event.call_cid.split(":")[1];

        if(!meetingId){
            return NextResponse.json({error: "Missing meeting id"}, {status: 400});
        }

        try {
            const call = streamVideo.video.call("default", meetingId);
            await call.end();
        } catch (error) {
            console.error("Failed to end call:", error);
            // Don't return error here as the participant has already left
        }
    }

    return NextResponse.json({received: true}, {status: 200});

            
}

