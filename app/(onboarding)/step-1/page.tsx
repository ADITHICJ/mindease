"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Step1() {
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");

  const handleNext = () => {
    if (!nickname || !dob || !gender) {
      alert("Please fill all fields.");
      return;
    }

    // Send data to next page (temporary localStorage)
    localStorage.setItem("onboard_nickname", nickname);
    localStorage.setItem("onboard_dob", dob);
    localStorage.setItem("onboard_gender", gender);

    router.push("/onboarding/step2");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-6">
      <div className="max-w-lg w-full bg-white p-8 rounded-3xl shadow-xl">
        <h1 className="text-2xl font-bold text-center">Let's Get to Know You ✨</h1>

        <div className="mt-6 space-y-5">

          {/* Nickname */}
          <div>
            <label className="block font-medium mb-1">Nickname</label>
            <input
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
              placeholder="What should we call you?"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>

          {/* DOB */}
          <div>
            <label className="block font-medium mb-1">Date of Birth</label>
            <input
              type="date"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block font-medium mb-1">Gender</label>
            <select
              className="w-full p-3 border rounded-xl"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="non-binary">Non-Binary</option>
              <option value="prefer-not">Prefer Not to Say</option>
            </select>
          </div>

          <button
            onClick={handleNext}
            className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
          >
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
}
