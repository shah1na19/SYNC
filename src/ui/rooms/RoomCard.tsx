import React from 'react';
import { StudyRoom } from '@/types';
import Link from 'next/link';

interface RoomCardProps {
  room: StudyRoom;
}

export const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  return (
    <div className="bg-slate-800 border border-slate-700 hover:border-indigo-500/50 rounded-xl p-5 flex flex-col justify-between transition shadow-md">
      <div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-base text-slate-100">{room.title}</h3>
          <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] px-2 py-0.5 rounded-full font-semibold">
            {room.status}
          </span>
        </div>
        <p className="text-xs text-slate-400 mb-3">🎯 Goal: {room.studyGoal}</p>
        <p className="text-xs text-indigo-400 mb-4">👥 {room.participants.length} Active Participants</p>
      </div>

      <Link
        href={`/rooms/${room.id}`}
        className="w-full text-center bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2 rounded-lg text-xs transition block"
      >
        Join Room
      </Link>
    </div>
  );
};
