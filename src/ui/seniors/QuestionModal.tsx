import React, { useState } from 'react';
import { Senior } from '@/types';

interface QuestionModalProps {
  senior: Senior;
  onClose: () => void;
  onSubmitSuccess: () => void;
}

export const QuestionModal: React.FC<QuestionModalProps> = ({ senior, onClose, onSubmitSuccess }) => {
  const [questionText, setQuestionText] = useState<string>('');
  const [courseCode, setCourseCode] = useState<string>('COMP 2006E');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitSuccess();
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
        
        <div className="flex justify-between items-center border-b border-slate-700 pb-3">
          <h3 className="text-base font-bold text-slate-100">
            Ask {senior.name}
          </h3>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 text-lg"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmitQuestion} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Select Related Course</label>
            <select
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none"
            >
              <option value="COMP 2006E">COMP 2006E — Data Structures</option>
              <option value="COMP 3003E">COMP 3003E — Computer Networks</option>
              <option value="EE 1007E">EE 1007E — Fundamentals of Electronic Technology</option>
              <option value="COMP 2030E">COMP 2030E — High-level Language Programming</option>
              <option value="MATH 1004E">MATH 1004E — Probability and Statistics</option>
              <option value="PHYS 1001BE">PHYS 1001BE — College Physics IB</option>
              <option value="BIO 1002E">EE 1007E — Life And Health Science</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Your Question or Help Request</label>
            <textarea
              rows={4}
              required
              placeholder="E.g., How did you prepare for Professor Zhang's midterm exam? Any specific topics to prioritize?"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-xs text-slate-100 focus:outline-none"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg text-xs font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium transition disabled:opacity-50"
            >
              {isSubmitting ? 'Sending...' : 'Submit Question'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
