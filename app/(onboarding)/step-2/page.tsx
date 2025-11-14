"use client";

import { useState } from "react";
import QuestionCard from "../components/QuestionCard";

const questions = [
  {
    question: "How often have you felt sad lately?",
    options: ["Never", "Sometimes", "Often", "Always"],
  },
  {
    question: "How well are you sleeping?",
    options: ["Very Well", "Okay", "Poorly", "Hardly Sleeping"],
  },
  {
    question: "How motivated do you feel daily?",
    options: ["Very Motivated", "Somewhat Motivated", "Neutral", "Not Motivated"],
  },
  {
    question: "How many hours do you usually sleep at night?",
    options: ["4-5 hours", "6-7 hours", "7-8 hours", "8+ hours"],
  },
  {
    question: "How often do you feel anxious?",
    options: ["Never", "Rarely", "Sometimes", "Frequently"],
  },
  {
    question: "How supported do you feel by people around you?",
    options: ["Very Supported", "Somewhat Supported", "Neutral", "Not Supported"],
  },
];

export default function Step2() {
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleAnswer = (option: string) => {
    const updated = [...answers];
    updated[currentIndex] = option;
    setAnswers(updated);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1); // go to next question
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (answers.includes("")) {
      alert("Please answer all questions.");
      return;
    }

    console.log("User Answers:", answers);
    alert("Profile setup completed! 🎉");

    // redirect or continue setup
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-6 py-10">
      <div className="max-w-xl w-full bg-white p-8 rounded-3xl shadow-xl transition-all">

        {/* Progress Indicator */}
        <p className="text-center text-gray-600 mb-3">
          Question {currentIndex + 1} of {questions.length}
        </p>

        {/* Show only one question */}
        <QuestionCard
          question={questions[currentIndex].question}
          options={questions[currentIndex].options}
          selected={answers[currentIndex]}
          onSelect={handleAnswer}
        />

        {/* Back button (only if not first question) */}
        {currentIndex > 0 && (
          <button
            onClick={() => setCurrentIndex(currentIndex - 1)}
            className="w-full mt-5 text-blue-600"
          >
            ← Back
          </button>
        )}
      </div>
    </div>
  );
}
