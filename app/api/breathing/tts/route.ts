import { NextResponse } from "next/server";
import { generateTTSChunk } from "@/utils/tts/ttsClient";

export async function POST(req: Request) {
  try {
    // Accept RAW text (safe!)
    const text = await req.text();

    if (!text || text.trim() === "") {
      return NextResponse.json(
        { ok: false, error: "Text is required" },
        { status: 400 }
      );
    }

    console.log("TTS REQUEST RECEIVED");

    // Generate audio buffer
    const audioBuffer = await generateTTSChunk(text);

    // Convert Node Buffer → Uint8Array for browser response
    const audioUint8 = new Uint8Array(audioBuffer);

    return new NextResponse(audioUint8, {
      headers: {
        "Content-Type": "audio/wav",
      },
    });
  } catch (err) {
    console.error("TTS Error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to generate TTS" },
      { status: 500 }
    );
  }
}
