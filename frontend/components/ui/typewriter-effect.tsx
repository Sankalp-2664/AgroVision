"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const TypewriterEffectLoop = ({
  words,
  className,
  cursorClassName,
  speed = 100, // Typing speed in ms
  deleteSpeed = 50, // Deleting speed in ms
  delay = 1000, // Delay before erasing
}: {
  words: string[];
  className?: string;
  cursorClassName?: string;
  speed?: number;
  deleteSpeed?: number;
  delay?: number;
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[currentWordIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (currentText.length < word.length) {
        timeout = setTimeout(() => {
          setCurrentText(word.substring(0, currentText.length + 1));
        }, speed);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), delay);
      }
    } else {
      if (currentText.length > 0) {
        timeout = setTimeout(() => {
          setCurrentText(word.substring(0, currentText.length - 1));
        }, deleteSpeed);
      } else {
        setIsDeleting(false);
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [
    currentText,
    isDeleting,
    currentWordIndex,
    words,
    speed,
    deleteSpeed,
    delay,
  ]);

  return (
    <div
      className={cn(
        "text-base sm:text-xl md:text-3xl lg:text-5xl font-bold text-center",
        className
      )}
    >
      {currentText}
      <motion.span
        initial={{ opacity: 1 }}
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        className={cn(
          "inline-block w-[4px] h-4 md:h-6 lg:h-10 bg-blue-500",
          cursorClassName
        )}
      ></motion.span>
    </div>
  );
};
