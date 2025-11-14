"use client";

import { useState } from "react";

const moods = [
  { emoji: "😊", label: "Happy" },
  { emoji: "😔", label: "Sad" },
  { emoji: "😤", label: "Stressed" },
  { emoji: "😌", label: "Calm" },
  { emoji: "🤔", label: "Thoughtful" },
  { emoji: "🥳", label: "Excited" },
  { emoji: "😴", label: "Tired" },
];

export default function MoodCheckin({ onSelectMood }: { onSelectMood?: (mood: string) => void }) {
  const [selectedMood, setSelectedMood] = useState<string>("");

  const handleSelect = (label: string) => {
    setSelectedMood(label);
    onSelectMood?.(label);
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md w-full">
      <h2 className="text-xl font-semibold mb-4 text-center">How are you feeling today?</h2>

      {/* Full-width horizontal scroll */}
      <div className="flex gap-4 overflow-x-auto pb-2 w-full">
        {moods.map((m) => (
          <button
            key={m.label}
            onClick={() => handleSelect(m.label)}
            className={`flex flex-col items-center justify-center min-w-[100px] p-4 rounded-xl border 
              transition-all hover:scale-105
              ${selectedMood === m.label ? "bg-blue-100 border-blue-600" : "bg-gray-100"}`}
          >
            <span className="text-3xl">{m.emoji}</span>
            <span className="text-sm mt-1">{m.label}</span>
          </button>
        ))}
      </div>

      {selectedMood && (
        <p className="mt-4 text-center text-gray-700">
          You are feeling <span className="font-semibold">{selectedMood}</span>.
        </p>
      )}
    </div>
  );
}
