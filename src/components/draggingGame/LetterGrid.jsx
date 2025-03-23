import React, { useState, useEffect } from 'react';
import { DndContext, useDraggable, DragOverlay } from '@dnd-kit/core';

export default function LetterGrid({ currentWord, arraySize }) {
  const [letters, setLetters] = useState([]);
  const [activeLetter, setActiveLetter] = useState(null); // Track the active dragged letter

  useEffect(() => {
    setLetters(LettersList(currentWord, arraySize)); // Update letters when the word changes
  }, [currentWord]);

  return (

    // dnd kit tag
    <
      // onDragStart={(event) => setActiveLetter(event.active.data.current.letter)}
      // onDragEnd={() => setActiveLetter(null)}
    >

        {/* Grid containing letters */}
      <div className="letter-grid">
        {letters.map((char, index) => (
          <Letter key={index} character={char} id={`letter-${char}-${index}`} />
        ))}
      </div>

    </>
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

/*
  Takes in word, and size of array to return.
*/
function LettersList(word, size) {

  // init all letter, and convert the word to uppercase and store in array
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let letterArray = Array.from(word.toUpperCase());

  // adding random letters to array until of maxMize
  while (letterArray.length < size) { 
    const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
    letterArray.push(randomLetter);
  }

  //Shuffeling the contents of array
  for (let i = letterArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letterArray[i], letterArray[j]] = [letterArray[j], letterArray[i]];
  }

  return letterArray;
}