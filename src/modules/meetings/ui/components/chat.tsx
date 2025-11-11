"use client";

import { useState } from "react";
import { Button } from "src/components/ui/button";
import { Input } from "src/components/ui/input";
import { ScrollArea } from "src/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "src/components/ui/avatar";
import { generateAvatarUri } from "src/lib/avatar";

type ChatMessage = { role: "user" | "assistant"; content: string };

interface Props {
	meetingId: string;
	userName?: string;
	userImage?: string | null;
	agentName?: string;
}

export default function Chat({ meetingId, userName = "You", userImage, agentName = "Assistant" }: Props) {
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [input, setInput] = useState("");
	const [pending, setPending] = useState(false);

	const onSend = async () => {
		const text = input.trim();
		if (!text || pending) return;
		setMessages((m) => [...m, { role: "user", content: text }]);
		setInput("");
		setPending(true);
		try {
			const res = await fetch("/api/chat", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ meetingId, message: text, history: messages }),
			});
			const json = await res.json();
			if (!res.ok) throw new Error(json?.error || "Failed to get response");
			setMessages((m) => [...m, { role: "assistant", content: json.reply }]);
		} catch (e) {
			const msg = e instanceof Error ? e.message : String(e);
			setMessages((m) => [...m, { role: "assistant", content: `Error: ${msg}` }]);
		} finally {
			setPending(false);
		}
	};

	return (
		<div className="flex flex-col border rounded-lg bg-white">
			<ScrollArea className="h-64 p-4">
				<div className="flex flex-col gap-3">
					{messages.map((m, i) => {
						const isUser = m.role === "user";
						const name = isUser ? userName : agentName;
						const initials = name
							.split(" ")
							.filter(Boolean)
							.slice(0, 2)
							.map((n) => n[0]?.toUpperCase())
							.join("") || "?";
						const avatarSrc = isUser
							? userImage || generateAvatarUri({ seed: userName, variant: "initials" })
							: generateAvatarUri({ seed: agentName, variant: "botttsNeutral" });
						return (
							<div key={i} className="flex items-start gap-2">
								<Avatar className="size-7 mt-0.5">
									<AvatarImage alt={`${name} avatar`} src={avatarSrc} />
									<AvatarFallback className="text-[10px] font-medium">{initials}</AvatarFallback>
								</Avatar>
								<div className="flex-1">
									<div className="text-xs text-muted-foreground mb-1">{name}</div>
									<div className="text-sm whitespace-pre-wrap">{m.content}</div>
								</div>
							</div>
						);
					})}
					{pending && (
						<div className="text-xs text-muted-foreground">Thinking…</div>
					)}
				</div>
			</ScrollArea>
			<div className="p-2 flex gap-2">
				<Input
					placeholder="Ask based on the meeting summary…"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyDown={(e) => e.key === "Enter" && onSend()}
				/>
				<Button onClick={onSend} disabled={pending || !input.trim()}>Send</Button>
			</div>
		</div>
	);
}

