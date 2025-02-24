import React, { useState, useEffect } from 'react';
import { useDraggable } from '@dnd-kit/core';

export default function LetterGrid() {
  // Store letters in state to prevent re-randomization
  const [letters, setLetters] = useState([]);

  // Generate the letter array only once when the component mounts
  useEffect(() => {
    setLetters(LettersList('cake'));
  }, []);

  return (
    <div className="letter-grid">
      {letters.map((char, index) => (
        <Letter key={index} character={char} id={`letter-${index}`} />
      ))}
    </div>
  );
}

function Letter({ character, id }) {
  const { attributes, listeners, setNodeRef } = useDraggable({ id });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="letter-box"
    >
      <p className="letter-font">{character}</p>
    </div>
  );
}

/*
  Letter generator that returns a 16-letter array from the input word
  plus random letters, ensuring no adjacent duplicates.
*/
function LettersList(word) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let letterArray = Array.from(word.toUpperCase());

  // Add random letters until the array length is 16
  while (letterArray.length < 16) {
    const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
    letterArray.push(randomLetter);
  }

  // Shuffle the array using Fisher-Yates algorithm
  for (let i = letterArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letterArray[i], letterArray[j]] = [letterArray[j], letterArray[i]];
  }

  return letterArray;
}
