import React from 'react';
import { Senior } from '@/types';

interface SeniorCardProps {
  senior: Senior;
  onSelect: (senior: Senior) => void;
}

export const SeniorCard: React.FC<SeniorCardProps> = ({ senior, onSelect }) => {
  return (
    <div className="bg-slate-800 border border-slate-700/70 hover:border-indigo-500/50 rounded-xl p-5 flex flex-col justify-between transition shadow-lg">
      <div>
        <div className="flex items-center space-x-4 mb-4">
          <img 
            src={senior.avatar} 
            alt={senior.name} 
            className="w-14 h-14 rounded-full border-2 border-indigo-500/30 bg-slate-900" 
          />
          <div>
            <h3 className="font-bold text-base text-slate-100">{senior.name}</h3>
            <p className="text-xs text-indigo-400 font-medium">{senior.grade}</p>
            <p className="text-xs text-slate-400">⭐ {senior.rating.toFixed(1)} / 5.0</p>
          </div>
        </div>

        <p className="text-xs text-slate-300 mb-4 line-clamp-2">{senior.bio}</p>

        <div className="mb-4">
          <span className="text-[10px] uppercase font-semibold text-slate-400 block mb-1">Courses Handled:</span>
          <div className="flex flex-wrap gap-1">
            {senior.coursesHandled.map((cId) => (
              <span key={cId} className="bg-slate-900 text-slate-300 border border-slate-700 text-[11px] px-2 py-0.5 rounded">
                {cId.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={() => onSelect(senior)}
        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2 rounded-lg text-xs transition"
      >
        Ask Question
      </button>
    </div>
  );
};
