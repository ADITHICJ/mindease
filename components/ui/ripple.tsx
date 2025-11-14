"use client";

import { motion } from "framer-motion";

export function Ripple({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 flex items-center justify-center ${className}`}>
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-primary/20"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: [0.4, 0, 0],
            scale: [1, 2.5, 3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeOut",
          }}
          style={{ width: 250, height: 250 }}
        />
      ))}
    </div>
  );
}
