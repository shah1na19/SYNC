"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import type { Student } from "@/types";

type ChatMessage = {
  id: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: string;
};

type RoomChatProps = {
  currentUser?: Student;
};

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "m1",
    senderName: "Zhang Ruixuan",
    senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=zhang-ruixuan",
    text: "Hey everyone, starting the 25-min Pomodoro block now!",
    timestamp: "10:00 AM",
  },
];

export function RoomChat({ currentUser }: RoomChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState("");

  const handleSendMessage = (event: React.FormEvent) => {
    event.preventDefault();
    if (!inputText.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderName: currentUser?.name ?? "You",
      senderAvatar: currentUser?.avatar ?? "https://api.dicebear.com/7.x/avataaars/svg?seed=you",
      text: inputText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((previous) => [...previous, newMessage]);
    setInputText("");
  };

  return (
    <div className="surface-card flex h-[420px] flex-col p-4">
      <h2 className="text-label border-b border-border pb-3">Room Chat</h2>

      <div className="my-3 flex-1 space-y-3 overflow-y-auto pr-1">
        {messages.map((message) => (
          <div key={message.id} className="flex items-start gap-2">
            <img
              src={message.senderAvatar}
              alt={`${message.senderName} avatar`}
              className="mt-0.5 h-6 w-6 shrink-0 rounded-full bg-elevated"
            />
            <div className="min-w-0 flex-1 rounded-[var(--radius-md)] border border-border bg-background/40 p-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[12px] font-semibold text-primary">{message.senderName}</span>
                <span className="text-meta shrink-0">{message.timestamp}</span>
              </div>
              <p className="text-secondary mt-1">{message.text}</p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage} className="flex gap-2 border-t border-border pt-3">
        <label htmlFor="room-chat-input" className="sr-only">
          Message
        </label>
        <input
          id="room-chat-input"
          type="text"
          placeholder="Type a message…"
          value={inputText}
          onChange={(event) => setInputText(event.target.value)}
          className="interactive flex-1 rounded-[var(--radius-md)] border border-border bg-background/50 px-3 py-2 text-[12px] text-foreground focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Send message"
          className="interactive flex items-center gap-1.5 rounded-[var(--radius-md)] bg-primary px-3 py-2 text-[12px] font-semibold text-primary-foreground hover:brightness-110"
        >
          <Send size={13} aria-hidden />
          Send
        </button>
      </form>
    </div>
  );
}
