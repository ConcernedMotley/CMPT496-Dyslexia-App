import React from 'react';
import { useDraggable } from '@dnd-kit/core';

export default function LetterGrid() {
  const letters = ['A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D'];

  return (
    <div className="letter-grid">
      {letters.map((char, index) => (
        <Letter key={index} character={char} id={`letter-${index}`} />
      ))}
    </div>
  );
}

function Letter({ character, id }) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id,
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
