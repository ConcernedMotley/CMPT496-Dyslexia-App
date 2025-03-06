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

  useEffect(() => {
    setCurrentWord(RandomWord()); // Set a new word when the component mounts
  }, []);

  const handleDragStart = (event) => {
    setActiveLetter(event.active.id);
  };

  const handleDragEnd = () => {
    setActiveLetter(null);
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <h1>Drag Activity - Level {level}</h1>
      <div className="vertical-flex" style={{ touchAction: 'none' }}>
        <AudioIcon word={currentWord} /> {/* Pass the current word */}
        <LetterGrid currentWord={currentWord} />
        <DroppableBox />
        <button>Done</button>
      </div>

      {/* Drag overlay for better movement */}
      <DragOverlay>
        {activeLetter ? (
          <div className="letter-box dragging">
            <p className="letter-font">{activeLetter.split('-')[1]}</p>
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
