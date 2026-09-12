'use client';

import React, { useState } from 'react';
import { SENIORS } from '@/data/seniors';
import { Senior } from '@/types';
import { SeniorCard } from '@/ui/seniors/SeniorCard';
import { QuestionModal } from '@/ui/seniors/QuestionModal';

export default function SeniorsPage() {
  const [selectedSenior, setSelectedSenior] = useState<Senior | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState<boolean>(false);

  return (
    <div className="space-y-6 p-6 bg-slate-900 text-slate-100 min-h-screen">
      <h2 className="text-xl font-bold">Ask a Senior</h2>

      {showSuccessToast && (
        <div className="bg-emerald-900/80 border border-emerald-500 text-emerald-200 px-4 py-3 rounded-lg text-sm">
          ✨ Your question has been sent to the senior mentor!
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SENIORS.map((senior) => (
          <SeniorCard 
            key={senior.id} 
            senior={senior} 
            onSelect={(s) => setSelectedSenior(s)} 
          />
        ))}
      </div>

      {selectedSenior && (
        <QuestionModal
          senior={selectedSenior}
          onClose={() => setSelectedSenior(null)}
          onSubmitSuccess={() => {
            setShowSuccessToast(true);
            setTimeout(() => setShowSuccessToast(false), 3000);
          }}
        />
      )}
    </div>
  );
}
