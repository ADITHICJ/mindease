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

export default function MoodCheckIn() {
  const [step, setStep] = useState(1);
  const [selectedMood, setSelectedMood] = useState("");
  const [note, setNote] = useState("");

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-3xl shadow-lg border border-gray-200 transition-all duration-300">
      {step === 1 ? (
        <div className="animate-fadeIn">
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            How are you feeling today?
          </h2>

          <div className="flex gap-4 overflow-x-auto mt-6 py-2 scrollbar-none">
            {moods.map((m) => (
              <button
                key={m.label}
                onClick={() => {
                  setSelectedMood(m.label);
                  setStep(2);
                }}
                className={`min-w-[95px] p-4 rounded-2xl border flex flex-col items-center shadow-sm transition-all hover:scale-105
                ${
                  selectedMood === m.label
                    ? "bg-blue-100 border-blue-600"
                    : "bg-gray-100 border-gray-300"
                }`}
              >
                <span className="text-4xl">{m.emoji}</span>
                <span className="text-sm mt-2 text-gray-700 font-medium">
                  {m.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="animate-fadeIn">
          <h2 className="text-xl font-semibold text-center text-gray-800">
            You're feeling {selectedMood}!
          </h2>

          <p className="text-center text-gray-500 mt-1">
            Want to add a short note? (optional)
          </p>

          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={4}
            placeholder="Why do you feel this way?"
            className="w-full mt-4 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition-all"
          />

          <button
            onClick={() => alert(`Saved mood: ${selectedMood}\nNote: ${note}`)}
            className="w-full mt-5 bg-blue-600 text-white py-3 rounded-xl shadow-md hover:bg-blue-700 transition-all"
          >
            Save Mood
          </button>

          <button
            onClick={() => alert(`Saved mood: ${selectedMood}`)}
            className="w-full text-blue-600 mt-3 hover:underline"
          >
            Skip & Save →
          </button>

          <button
            onClick={() => setStep(1)}
            className="w-full text-gray-600 mt-4 hover:underline"
          >
            ← Back
          </button>
        </div>
      )}
    </div>
  );
}
