"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function HomePage() {
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function loadUser() {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user ?? null);
    }
    loadUser();
  }, []);

  const tools = [
    {
      id: "mood",
      title: "Mood Check-in",
      desc: "Quick daily mood logging with emojis and short notes — see trends over time.",
      href: "/mood-checkin",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 2a10 10 0 100 20 10 10 0 000-20z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          <path d="M8 13s1.5 2 4 2 4-2 4-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          <path d="M9 9h.01M15 9h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      ),
    },
    {
      id: "chatbot",
      title: "Chatbot",
      desc: "Talk confidentially with an AI companion for reflections, prompts, and coping suggestions.",
      href: "/chat",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      ),
    },
    {
      id: "breathing",
      title: "Breathing Exercise",
      desc: "Guided breathing sessions (box, 4-4-4, or paced) to calm your nervous system.",
      href: "/breathing",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 3v18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          <path d="M5 7a7 7 0 0114 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          <path d="M5 17a7 7 0 0114 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      ),
    },
    {
      id: "audio",
      title: "Audio",
      desc: "Curated meditation & soundscapes — short and long options for focus and sleep.",
      href: "/audio",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M9 9v6a3 3 0 006 0V9a3 3 0 00-6 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          <path d="M5 12h.01M19 12h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      ),
    },
    {
      id: "video",
      title: "Video",
      desc: "Guided practices and short lessons — watch at your pace to learn tools and techniques.",
      href: "/video",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M23 7l-7 5 7 5V7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          <rect x="1" y="5" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"></rect>
        </svg>
      ),
    },
    {
      id: "analytics",
      title: "Mood Analytics",
      desc: "Visualize mood trends, triggers, and improvements with easy charts and insights.",
      href: "/analytics",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M3 3v18h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          <path d="M7 13v5M12 9v9M17 5v13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      ),
    },
  ];

  return (
    <main className="min-h-screen w-full font-sans text-gray-800">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 w-full flex flex-col md:flex-row items-center px-6 md:px-16 gap-10">
        
        {/* Image Left */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-start">
          <img
            src="/home1.jpg"
            alt="Meditation Illustration"
            className="w-80 md:w-full max-w-sm"
          />
        </div>

        {/* Text Right */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl font-bold leading-snug max-w-xl">
            Your safe space for emotional wellbeing.
          </h1>
          <p className="text-gray-600 mt-4 max-w-md">
            Support for stress, anxiety, clarity, and inner balance.
          </p>

          <div className="flex justify-center md:justify-start space-x-4 mt-6">
            {!user ? (
              <>
                <a
                  href="/sign-up"
                  className="px-6 py-3 bg-blue-700 text-white rounded-md hover:bg-blue-800"
                >
                  Get Started
                </a>

                <button className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-100">
                  Learn More
                </button>
              </>
            ) : (
              <a
                href="/dashboard"
                className="px-6 py-3 bg-blue-700 text-white rounded-md hover:bg-blue-800"
              >
                Continue Your Journey
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Subtext Section */}
      <section className="w-full flex flex-col items-center text-center px-6 mt-10">
        <h2 className="text-2xl font-bold">
          Navigating Emotional Life Can Be Tough
        </h2>
        <p className="text-gray-600 max-w-2xl mt-4">
          MindEase helps you build emotional resilience with tools grounded in
          science, psychology, and mindfulness.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg px-6 py-4 mt-6 max-w-xl">
          <p className="text-blue-800 font-medium">MindEase is here to help.</p>
        </div>
      </section>

      {/* Tools Section (Updated) */}
      <section id="tools" className="w-full mt-20 px-6 md:px-10">
        <h2 className="text-2xl font-bold text-center mb-8">
          Toolkit for Your Wellbeing Journey
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className="flex flex-col justify-between border rounded-lg p-6 shadow-sm hover:shadow-lg transition-all bg-white"
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-md bg-blue-50 text-blue-700">
                  {tool.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{tool.title}</h3>
                  <p className="text-gray-600 text-sm mt-2">{tool.desc}</p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <a
                  href={tool.href}
                  className="text-sm font-medium px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800"
                  aria-label={`Open ${tool.title}`}
                >
                  Open
                </a>

                <a
                  href={tool.href}
                  className="text-sm text-blue-700 underline hidden sm:inline-block"
                >
                  Learn more
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Emotional Resilience Section */}
      <section className="w-full mt-20 px-10 flex flex-col md:flex-row items-center gap-10">
        <img
          src="/calmocean.jpg"
          alt="Calm Ocean"
          className="w-full md:w-1/2 rounded-lg shadow-md"
        />

        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-bold mb-4">
            Build Lasting Emotional Resilience
          </h2>
          <ul className="text-gray-700 space-y-3 list-disc list-inside">
            <li>Daily mindfulness reminders</li>
            <li>Track mood & emotional patterns</li>
            <li>AI-guided reflections</li>
            <li>Healthy habit formation</li>
            <li>Learn coping strategies</li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="w-full mt-20 px-10 mb-28">
        <h2 className="text-2xl font-bold text-center mb-10">
          Frequently Asked Questions
        </h2>

        <div className="max-w-2xl mx-auto space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <details key={i} className="border rounded-lg p-4 cursor-pointer">
              <summary className="font-medium">Sample question #{i}?</summary>
              <p className="mt-2 text-gray-600 text-sm">
                This is a sample answer for the FAQ.
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
