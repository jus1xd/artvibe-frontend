import React, { useState, useEffect } from "react";

type TProps = {
  originalText: string;
  speed?: number;
};

const TypingAnimation: React.FC<TProps> = ({ speed, originalText }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    setTimeout(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= originalText.length) {
          setText(originalText.substring(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, speed ? speed : 70); // Интервал между символами (в миллисекундах)
    }, 1000);
  }, []);

  return <div className="typing-animation">{text}</div>;
};

export default TypingAnimation;
