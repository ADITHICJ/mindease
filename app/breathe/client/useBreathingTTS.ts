"use client";

import { useRef, useState } from "react";

export function useBreathingTTS() {
  const queue = useRef<Blob[]>([]);
  const isPlaying = useRef(false);
  const [ready, setReady] = useState(false);

  function playNext() {
    if (isPlaying.current || queue.current.length === 0) return;

    isPlaying.current = true;
    const blob = queue.current.shift()!;
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);

    audio.onended = () => {
      isPlaying.current = false;
      playNext();
    };

    audio.play();
  }

  async function start(fullScriptChunks: string[]) {
    // 1) Generate first chunk
    const firstChunkAudio = await fetch("/api/breathing/tts", {
      method: "POST",
      body: JSON.stringify({ text: fullScriptChunks[0] }),
      headers: { "Content-Type": "application/json" },
    }).then((r) => r.blob());

    queue.current.push(firstChunkAudio);
    setReady(true);
    playNext();

    // 2) Background processing for remaining chunks
    for (let i = 1; i < fullScriptChunks.length; i++) {
      const audio = await fetch("/api/breathing/tts", {
        method: "POST",
        body: JSON.stringify({ text: fullScriptChunks[i] }),
        headers: { "Content-Type": "application/json" },
      }).then((r) => r.blob());

      queue.current.push(audio);
    }
  }

  return { start, ready };
}
