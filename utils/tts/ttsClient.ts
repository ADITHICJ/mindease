import { GoogleGenAI } from "@google/genai";

export async function generateTTSChunk(text: string) {
  try {
    const client = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });

    const response = await client.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text }] }],
      config: {
        responseModalities: ["AUDIO"],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: "Zephyr" },
          },
        },
      },
    });

    // Get raw PCM audio data (base64)
    const inline = response.candidates?.[0]?.content?.parts?.[0]?.inlineData;
    const rawBase64 = inline?.data;
    const mime = inline?.mimeType;

    if (!rawBase64) throw new Error("No audio returned");

    const rawBuffer = Buffer.from(rawBase64, "base64");

    // Convert audio/L16;rate=24000 → WAV
    return convertToWav(rawBuffer, mime || "audio/L16;rate=24000");
  } catch (err) {
    console.error("TTS Error:", err);
    throw err;
  }
}

function convertToWav(rawBuf: Buffer, mime: string) {
  const rate = parseInt(mime.split("rate=")[1]) || 24000;
  const bits = parseInt(mime.match(/L(\d+)/)?.[1] || "16");

  const channels = 1;
  const bytesPerSample = bits / 8;
  const blockAlign = channels * bytesPerSample;
  const byteRate = rate * blockAlign;
  const dataLength = rawBuf.length;

  const header = Buffer.alloc(44);

  header.write("RIFF", 0); // ChunkID
  header.writeUInt32LE(36 + dataLength, 4); // ChunkSize
  header.write("WAVE", 8); // Format
  header.write("fmt ", 12); // Subchunk1ID
  header.writeUInt32LE(16, 16); // Subchunk1Size
  header.writeUInt16LE(1, 20); // AudioFormat PCM
  header.writeUInt16LE(channels, 22);
  header.writeUInt32LE(rate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bits, 34);
  header.write("data", 36); // Subchunk2ID
  header.writeUInt32LE(dataLength, 40);

  return Buffer.concat([header, rawBuf]);
}
