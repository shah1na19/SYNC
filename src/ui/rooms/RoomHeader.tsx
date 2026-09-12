import React from 'react';
import { StudyRoom } from '@/types';

interface RoomHeaderProps {
  room?: StudyRoom;
  focusStatus: 'Deep Work' | 'Taking a Break' | 'Asking Questions';
  onStatusChange: (status: 'Deep Work' | 'Taking a Break' | 'Asking Questions') => void;
}

export const RoomHeader: React.FC<RoomHeaderProps> = ({ room, focusStatus, onStatusChange }) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-800 p-4 rounded-lg border border-slate-700">
      <div>
        <h2 className="text-xl font-bold">{room?.title || 'HIVE Virtual Study Room'}</h2>
        <p className="text-sm text-slate-400">Course ID: {room?.courseId || 'CS101'}</p>
      </div>
      
      <div className="flex items-center space-x-2">
        <span className="text-xs text-slate-400 font-medium">Status:</span>
        <select
          value={focusStatus}
          onChange={(e) => onStatusChange(e.target.value as any)}
          className="bg-slate-700 text-xs text-emerald-400 font-semibold px-3 py-1.5 rounded border border-slate-600 focus:outline-none"
        >
          <option value="Deep Work">🟢 Deep Work</option>
          <option value="Taking a Break">☕ Taking a Break</option>
          <option value="Asking Questions">💬 Asking Questions</option>
        </select>
      </div>
    </div>
  );
};
