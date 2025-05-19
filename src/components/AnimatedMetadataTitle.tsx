"use client";

import { useEffect } from "react";

const AnimatedMetadataTitle = ({ originalTitle }: { originalTitle: string }) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";

  const getRandomChar = () => {
    return characters[Math.floor(Math.random() * characters.length)];
  };

  const animateStepByStep = () => {
    let currentIndex = 0;
    const displayTitle = originalTitle.split("");
    const alphaNumIndices = originalTitle
      .split("")
      .map((c, i) => (/[a-zA-Z0-9]/.test(c) ? i : null))
      .filter((i): i is number => i !== null);

    const stepInterval = setInterval(() => {
      if (currentIndex >= alphaNumIndices.length) {
        clearInterval(stepInterval);
        document.title = originalTitle;

        // Rejouer après 5s
        setTimeout(animateStepByStep, 5000);
        return;
      }

      const idx = alphaNumIndices[currentIndex];
      const originalChar = originalTitle[idx];

      const scrambleInterval = setInterval(() => {
        displayTitle[idx] = getRandomChar();
        document.title = displayTitle.join("");
      }, 50);

      setTimeout(() => {
        clearInterval(scrambleInterval);
        displayTitle[idx] = originalChar;
        document.title = displayTitle.join("");
        currentIndex++;
      }, 1000);
    }, 1000);
  };

  useEffect(() => {
    animateStepByStep();

    return () => {
      document.title = originalTitle;
    };
  }, [originalTitle]);

  return null;
};

export default AnimatedMetadataTitle;
