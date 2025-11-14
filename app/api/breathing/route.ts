import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { splitBySize } from "@/utils/tts/chunker";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const CHUNK_SIZE = 1200;

/** Builds the full breathing prompt dynamically */
function buildBreathingPrompt({
  exerciseName,
  totalMinutes,
  inhale,
  hold,
  exhale,
}: {
  exerciseName: string;
  totalMinutes: number;
  inhale: number;
  hold: number;
  exhale: number;
}) {
  return `
You are a Guided Breathing Script Generator.

Your task: Generate a full guided breathing audio script in text form.  
The script must be suitable for text-to-speech conversion.

===== USER PARAMETERS =====
Breathing exercise name: ${exerciseName}
Total duration in minutes: ${totalMinutes}
Inhale duration (seconds): ${inhale}
Hold duration (seconds): ${hold}
Exhale duration (seconds): ${exhale}

===== SCRIPT REQUIREMENTS =====
1. Start with a gentle welcome message.
2. Ask the user to sit comfortably, relax their shoulders, and close their eyes.
3. Briefly explain the breathing pattern they will follow.
4. Begin ROUND 1 and continue generating rounds until the total time is completed.

5. Each round must include:
    - “Round X”
    - INHALE instruction with a dynamic countdown:
        Format: “Inhale ${inhale}… ${inhale - 1}… ${
    inhale - 2
  }… … 1… [affirmation]”
    - HOLD instruction with a dynamic countdown:
        Format: “Hold ${hold}… ${hold - 1}… ${hold - 2}… … 1… [affirmation]”
    - EXHALE instruction with a dynamic countdown:
        Format: “Exhale ${exhale}… ${exhale - 1}… ${
    exhale - 2
  }… … 1… [affirmation]”

    (The model must automatically count down correctly from the given number down to 1.)

6. Affirmations:
    - Must be short (3–9 words)
    - Must be positive and calming
    - Must NOT repeat in the whole session
    - Examples: “You are safe”, “Your mind is relaxing”, “You are becoming lighter”

7. Keep the number of rounds appropriate so the total script length matches the user’s duration.
8. End with a gentle closing message helping the user come back slowly.

===== OUTPUT FORMAT =====
Provide the script EXACTLY in the following format:

[Welcome message]

[Instructions]

--- Start of Session ---
Round 1:
Inhale: {dynamic countdown numbers}… [affirmation]
Hold: {dynamic countdown numbers}… [affirmation]
Exhale: {dynamic countdown numbers}… [affirmation]

Round 2:
...

Continue until total minutes = ${totalMinutes}

--- End of Session ---
[Closing message]

Make the script warm, slow, peaceful, and meditative.
`;
}

/** Generate full script using Gemini Flash */
async function generateFullScript(prompt: string) {
  const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-flash" });

  const result = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
  });

  if (typeof result.response?.text === "function") {
    return result.response.text();
  }

  const text =
    result.response?.candidates?.[0]?.content?.parts
      ?.map((p: any) => p.text || "")
      .join("") ?? "";

  return text;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { exerciseName, totalMinutes, inhale, hold, exhale } = body;

    const prompt = buildBreathingPrompt({
      exerciseName,
      totalMinutes,
      inhale,
      hold,
      exhale,
    });

    console.log("PROMPT BEING SENT TO GEMINI:", prompt); // ✔ correct place

    const fullScript = await generateFullScript(prompt);

    let chunks = splitBySize(fullScript, CHUNK_SIZE);

    if (!chunks || chunks.length === 0) {
      console.error("❌ No chunks generated. fullScript was:", fullScript);
      chunks = ["Breathing script generation failed. Please try again."];
    }

    return NextResponse.json({
      ok: true,
      fullScript,
      chunks,
    });
  } catch (err) {
    console.error("Breathing script error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to generate breathing script" },
      { status: 500 }
    );
  }
}
