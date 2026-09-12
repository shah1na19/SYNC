import React from 'react';
import { Student } from '@/types';

interface ParticipantListProps {
  participants: Student[];
}

export const ParticipantList: React.FC<ParticipantListProps> = ({ participants }) => {
  return (
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
  );
};
