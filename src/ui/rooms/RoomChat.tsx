import React, { useState } from 'react';
import { Student } from '@/types';

interface ChatMessage {
  id: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: string;
}

interface RoomChatProps {
  currentUser?: Student;
}

export const RoomChat: React.FC<RoomChatProps> = ({ currentUser }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      senderName: 'Study Partner',
      senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=partner',
      text: 'Hey everyone, starting the 25-min Pomodoro block now!',
      timestamp: '10:00 AM',
    },
  ]);
  const [inputText, setInputText] = useState<string>('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderName: currentUser?.name || 'You',
      senderAvatar: currentUser?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText('');
  };

  return (
    <div className="flex flex-col h-[500px] bg-slate-800 rounded-lg border border-slate-700 p-4">
      <h3 className="text-sm font-semibold text-slate-300 pb-3 border-b border-slate-700">
        Room Chat
      </h3>

      <div className="flex-1 overflow-y-auto my-3 space-y-3 pr-1">
        {messages.map((msg) => (
          <div key={msg.id} className="flex items-start space-x-2 text-xs">
            <img src={msg.senderAvatar} alt={msg.senderName} className="w-6 h-6 rounded-full mt-0.5" />
            <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-700/50 flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-indigo-400">{msg.senderName}</span>
                <span className="text-[10px] text-slate-500">{msg.timestamp}</span>
              </div>
              <p className="text-slate-300">{msg.text}</p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage} className="flex gap-2 pt-2 border-t border-slate-700">
        <input
          type="text"
          placeholder="Type a message..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-2 rounded-lg text-xs font-medium transition"
        >
          Send
        </button>
      </form>
    </div>
  );
};
