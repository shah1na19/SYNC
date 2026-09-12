import React, { useState, useEffect } from 'react';
import { StudyRoom as StudyRoomType, Student } from '../types';
import { STUDENTS } from '../data/mockData';

interface StudyRoomProps {
  room?: StudyRoomType;
}

interface ChatMessage {
  id: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: string;
}

export const StudyRoomComponent: React.FC<StudyRoomProps> = ({ room }) => {
  // 1. Timer State
  const [timeLeft, setTimeLeft] = useState<number>((room?.timerMinutes || 25) * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // 2. Goal & Focus Status State
  const [goal, setGoal] = useState<string>(room?.studyGoal || 'Review Chapter 3-5 problem sets');
  const [isEditingGoal, setIsEditingGoal] = useState<boolean>(false);
  const [focusStatus, setFocusStatus] = useState<'Deep Work' | 'Taking a Break' | 'Asking Questions'>('Deep Work');

  // 3. Participants State
  const [participants] = useState<Student[]>(
    STUDENTS.slice(0, 3) // Seeded with first 3 mock students
  );

  // 4. Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      senderName: STUDENTS[0].name,
      senderAvatar: STUDENTS[0].avatar,
      text: 'Hey everyone, starting the 25-min Pomodoro block now!',
      timestamp: '10:00 AM',
    },
  ]);
  const [inputText, setInputText] = useState<string>('');

  // Timer Effect Logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]);

  // Timer Handlers
  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft((room?.timerMinutes || 25) * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Chat Handler
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderName: 'You',
      senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText('');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 bg-slate-900 text-slate-100 rounded-xl border border-slate-800">
      
      {/* LEFT COLUMN: Timer & Study Goal (2 cols) */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Header & Status Selector */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-800 p-4 rounded-lg">
          <div>
            <h2 className="text-xl font-bold">{room?.title || 'HIVE Virtual Study Room'}</h2>
            <p className="text-sm text-slate-400">Course Code: CS101</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-400 font-medium">Status:</span>
            <select
              value={focusStatus}
              onChange={(e) => setFocusStatus(e.target.value as any)}
              className="bg-slate-700 text-xs text-emerald-400 font-semibold px-3 py-1.5 rounded border border-slate-600 focus:outline-none"
            >
              <option value="Deep Work">🟢 Deep Work</option>
              <option value="Taking a Break">☕ Taking a Break</option>
              <option value="Asking Questions">💬 Asking Questions</option>
            </select>
          </div>
        </div>

        {/* Pomodoro Timer Box */}
        <div className="flex flex-col items-center justify-center bg-slate-800/50 p-8 rounded-xl border border-slate-700/50 text-center">
          <div className="text-6xl font-mono font-bold tracking-wider text-emerald-400 mb-6">
            {formatTime(timeLeft)}
          </div>
          <div className="flex items-center space-x-4">
            {!isRunning ? (
              <button
                onClick={startTimer}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg transition"
              >
                Start
              </button>
            ) : (
              <button
                onClick={pauseTimer}
                className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-medium rounded-lg transition"
              >
                Pause
              </button>
            )}
            <button
              onClick={resetTimer}
              className="px-6 py-2.5 bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium rounded-lg transition"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Study Goal Section */}
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Current Session Goal
            </span>
            <button
              onClick={() => setIsEditingGoal(!isEditingGoal)}
              className="text-xs text-indigo-400 hover:underline"
            >
              {isEditingGoal ? 'Save' : 'Edit Goal'}
            </button>
          </div>
          {isEditingGoal ? (
            <input
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-sm text-slate-100 focus:outline-none"
            />
          ) : (
            <p className="text-sm font-medium text-slate-200">🎯 {goal}</p>
          )}
        </div>

        {/* Active Participants */}
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Participants ({participants.length})
          </h3>
          <div className="flex flex-wrap gap-3">
            {participants.map((p) => (
              <div key={p.id} className="flex items-center space-x-2 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-700">
                <img src={p.avatar} alt={p.name} className="w-6 h-6 rounded-full" />
                <span className="text-xs font-medium text-slate-300">{p.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* RIGHT COLUMN: Study Room Chat */}
      <div className="flex flex-col h-[500px] bg-slate-800 rounded-lg border border-slate-700 p-4">
        <h3 className="text-sm font-semibold text-slate-300 pb-3 border-b border-slate-700">
          Room Chat
        </h3>

        {/* Message Feed */}
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

        {/* Chat Input */}
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

    </div>
  );
};
