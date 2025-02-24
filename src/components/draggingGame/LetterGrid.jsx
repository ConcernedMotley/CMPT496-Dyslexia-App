import React, { useState, useEffect } from 'react';
import { DndContext, useDraggable, DragOverlay } from '@dnd-kit/core';

export default function LetterGrid() {
  const [currentWord, setCurrentWord] = useState('');
  const [letters, setLetters] = useState([]);
  const [activeLetter, setActiveLetter] = useState(null); // Track the active dragged letter

  useEffect(() => {
    const newWord = RandomWord();
    setCurrentWord(newWord);
    setLetters(LettersList(newWord));
  }, []);

  return (
    <DndContext onDragStart={(event) => setActiveLetter(event.active.data.current.letter)}
                onDragEnd={() => setActiveLetter(null)}>
      <WordPlaceHolder word={currentWord} />
      <div className="letter-grid">
        {letters.map((char, index) => (
          <Letter key={index} character={char} id={`letter-${index}`} />
        ))}
      </div>

      {/* Show the dragged letter instead of the ID */}
      <DragOverlay>
        {activeLetter ? (
          <div className="letter-box dragging">
            <p className="letter-font">{activeLetter}</p>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

function Letter({ character, id }) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id,
    data: { letter: character }, // Attach the letter data
  });

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

function LettersList(word) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let letterArray = Array.from(word.toUpperCase());

  while (letterArray.length < 16) {
    const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
    letterArray.push(randomLetter);
  }

  for (let i = letterArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letterArray[i], letterArray[j]] = [letterArray[j], letterArray[i]];
  }

  return letterArray;
}

function RandomWord() {
  const wordsList = [
    'book', 'tree', 'game', 'star', 'lamp',
    'fish', 'door', 'snow', 'rock', 'jump',
    'blue', 'fire', 'moon', 'wind', 'ship',
    'frog', 'ring', 'sand', 'wave', 'path',
  ];

  const wordIndex = Math.floor(Math.random() * wordsList.length);
  return wordsList[wordIndex];
}

export function WordPlaceHolder({ word }) {
  return (
    <div>
      <h1>{word.toUpperCase()}</h1>
      <p>The text above is a placeholder, will be replace with a play sound button once Audio is integreted.</p>
    </div>
  );
}
