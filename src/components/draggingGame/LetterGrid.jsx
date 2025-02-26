import React, { useState, useEffect } from 'react';
import { DndContext, useDraggable, DragOverlay } from '@dnd-kit/core';

export default function LetterGrid({ currentWord }) {
  const [letters, setLetters] = useState([]);
  const [activeLetter, setActiveLetter] = useState(null); // Track the active dragged letter

  useEffect(() => {
    setLetters(LettersList(currentWord)); // Update letters when the word changes
  }, [currentWord]);

  return (
    <DndContext
      onDragStart={(event) => setActiveLetter(event.active.data.current.letter)}
      onDragEnd={() => setActiveLetter(null)}
    >
      <div className="letter-grid">
        {letters.map((char, index) => (
          <Letter key={index} character={char} id={`letter-${index}`} />
        ))}
      </div>

      {/* Drag overlay for better movement */}
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
      {...listeners} // Ensures the element is draggable
      {...attributes} // Includes necessary drag properties
      className="letter-box"
      tabIndex={0} // Allows keyboard interactions
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