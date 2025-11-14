"use client";

import { useState } from "react";

export default function ProfileSetupPage() {
  const [nickname, setNickname] = useState("");
  const [dob, setDob] = useState("");
  const [supportStyle, setSupportStyle] = useState("");
  const [primaryGoal, setPrimaryGoal] = useState("");
  const [checkInFrequency, setCheckInFrequency] = useState("");

  const handleSubmit = () => {
    alert(
      `Profile Saved:\nNickname: ${nickname}\nDOB: ${dob}\nSupport Style: ${supportStyle}\nGoal: ${primaryGoal}\nCheck-ins: ${checkInFrequency}`
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="w-full max-w-lg bg-white p-8 rounded-3xl shadow-lg">
        <h1 className="text-2xl font-bold text-center">
          Set Up Your Profile ✨
        </h1>
        <p className="text-center text-gray-500 mt-1">
          This helps us personalize your mental wellness journey.
        </p>

        <div className="mt-6 space-y-5">

          {/* Nickname */}
          <div>
            <label className="block font-medium mb-1">Nickname</label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="What should we call you?"
            />
          </div>

          {/* DOB */}
          <div>
            <label className="block font-medium mb-1">Date of Birth</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Support Style */}
          <div>
            <label className="block font-medium mb-1">Preferred Support Style</label>
            <select
              value={supportStyle}
              onChange={(e) => setSupportStyle(e.target.value)}
              className="w-full p-3 border rounded-xl"
            >
              <option value="">Select one</option>
              <option value="gentle">Gentle & Comforting</option>
              <option value="motivational">Motivational & Energetic</option>
              <option value="logical">Logical & Objective</option>
              <option value="mixed">A mix of everything</option>
            </select>
          </div>

          {/* Primary Goal */}
          <div>
            <label className="block font-medium mb-1">Your Primary Goal</label>
            <select
              value={primaryGoal}
              onChange={(e) => setPrimaryGoal(e.target.value)}
              className="w-full p-3 border rounded-xl"
            >
              <option value="">Select one</option>
              <option value="stress">Reduce Stress</option>
              <option value="sleep">Improve Sleep</option>
              <option value="mood">Improve Mood</option>
              <option value="habits">Build Healthy Habits</option>
              <option value="focus">Increase Focus</option>
              <option value="awareness">Improve Self-awareness</option>
            </select>
          </div>

          {/* Check-in Frequency */}
          <div>
            <label className="block font-medium mb-1">Mood Check-in Frequency</label>
            <select
              value={checkInFrequency}
              onChange={(e) => setCheckInFrequency(e.target.value)}
              className="w-full p-3 border rounded-xl"
            >
              <option value="">Choose</option>
              <option value="daily">Daily</option>
              <option value="2days">Every 2 days</option>
              <option value="weekly">Weekly</option>
              <option value="manual">I'll check in myself</option>
            </select>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-3 rounded-xl mt-4 hover:bg-blue-700 transition-all"
          >
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
}
