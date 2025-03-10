import React, { useState, useEffect } from 'react';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { Link, useParams } from 'react-router-dom';
import LetterGrid from './draggingGame/LetterGrid';
import DroppableBox from './draggingGame/DroppableBox';
import AudioIcon from './AudioIcon';
import '../styles/DraggingGame.css';
import '../styles/pageStyle.css';

export default function DraggingGame() {
  const { level } = useParams();
  const [activeLetter, setActiveLetter] = useState(null);
  const [currentWord, setCurrentWord] = useState("");
  const [dragOverMessage, setDragOverMessage] = useState("");

  useEffect(() => {
    setCurrentWord(RandomWord()); // Set a new word when the component mounts
  }, []);

  const handleDragStart = (event) => {
    setActiveLetter(event.active.id);
  };

  const handleDragOver = (event) => {
    // if (event.over) {
    //   if (event.over.id.split('-')[0] === "dropBox")
    //     setDragOverMessage(`Dragging over ${event.over.id}`);
    // } else {
    //   setDragOverMessage("");
    // }
  };

  const handleDragEnd = (event) => {
    setActiveLetter(null);
    setDragOverMessage("");

    if (event.over.id.split('-')[0] === "dropBox") {
      const dropBoxId = event.over.id.split('-')[1];
      const letter = event.active.data.current.letter;
      console.log(`${letter} on box ${dropBoxId}`);
    }

  };

  return (
    <DndContext onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
      <h1>Drag Activity - Level {level}</h1>
      <div className="vertical-flex" style={{ touchAction: 'none' }}>
        <AudioIcon word={currentWord} /> {/* Pass the current word */}
        <LetterGrid currentWord={currentWord} arraySize={16} />
        <DroppableBox />
        <p>{dragOverMessage}</p> {/* Display drag over message */}
        <button>Done</button>
      </div>

      {/* Drag overlay for better movement */}
      <DragOverlay>
        {activeLetter ? (
          <div className="letter-box dragging">
            <p className="letter-font">{activeLetter.split('-')[0]}</p>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

function RandomWord() {
  // const wordsList = [
  //   'book', 'tree', 'game', 'star', 'lamp',
  //   'fish', 'door', 'snow', 'rock', 'jump',
  //   'blue', 'fire', 'moon', 'wind', 'ship',
  //   'frog', 'ring', 'sand', 'wave', 'path',
  // ];

  const wordsList = [
    'book', 'tree', 'game', 'star', 'lamp'];

  const wordIndex = Math.floor(Math.random() * wordsList.length);
  return wordsList[wordIndex];
}
