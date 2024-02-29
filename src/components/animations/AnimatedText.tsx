import React from 'react';

interface AnimatedTextProps {
  text: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text }) => {
  // Splitting text into words instead of letters to preserve spaces
  const words = text.split(' ').map((word) => word.split(''));

  return (
    <h1 className="text-4xl text-white text-center w-4/5  lg:w-2/5 font-bold mb-6">
      {words.map((word, wordIndex) => (
        <React.Fragment key={wordIndex}>
          {wordIndex > 0 && <span className="mx-2"></span>}{/* Adding space between words */}
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
