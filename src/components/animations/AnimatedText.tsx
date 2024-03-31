import React from 'react';

interface AnimatedTextProps {
  text: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text }) => {
  // Splitting text into words instead of letters to preserve spaces
  const words = text.split(' ').map((word) => word.split(''));

  return (
    <h1 className="leading-0 text-white text-3xl md:text-5xl font-bold">
      {words.map((word, wordIndex) => (
        <React.Fragment key={wordIndex}>
          {wordIndex > 0 && <span className="mx-2"></span>}
          {word.map((letter, letterIndex) => (
            <span
              key={letterIndex}
              className="gradient-text"
              style={{
                animation: `slideInRight 0.5s ease forwards ${wordIndex + letterIndex / 10}s`,
                display: 'inline-block',
              }}
            >
              {letter}
            </span>
          ))}
        </React.Fragment>
      ))}
    </h1>
  );
};

export default AnimatedText;
