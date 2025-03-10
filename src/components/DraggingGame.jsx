import React, { useState, useEffect } from 'react';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { Link, useParams } from 'react-router-dom';
import LetterGrid from './draggingGame/LetterGrid';
import DroppableBox from './draggingGame/DroppableBox';
import AudioIcon from './AudioIcon';
import '../styles/DraggingGame.css';
import '../styles/pageStyle.css';
import Popup from 'reactjs-popup';
import { set } from 'mongoose';

export default function DraggingGame() {
  const { level } = useParams();
  const [activeLetter, setActiveLetter] = useState(null);
  const [currentWord, setCurrentWord] = useState("");
  const [dragOverMessage, setDragOverMessage] = useState("");
  const [boxContents, setBoxContents] = useState(Array(4).fill(''));
  const [popupMessage, setPopupMessage] = useState("");

  useEffect(() => {
    setCurrentWord(RandomWord()); // Set a new word when the component mounts
  }, []);

  const updateBoxContent = (index, content) => {
    setBoxContents(prevContents => {
      const newContents = [...prevContents];
      newContents[index] = content;
      return newContents;
    });
  };

  const handleDragStart = (event) => {
    setActiveLetter(event.active.id.split('-')[1]);
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

    if (event.over && event.over.id.split('-')[0] === "dropBox") {
      const dropBoxId = event.over.id.split('-')[1];
      const letter = event.active.data.current.letter;
      console.log(`${letter} on box ${dropBoxId}`);
      updateBoxContent(parseInt(dropBoxId), letter);
    }
  };

  const handleDoneClick = () => {
    const formedWord = boxContents.join('').toLowerCase();
    if (formedWord === currentWord) {
      setPopupMessage("Correct word");
      alert("Correct word");
      setCurrentWord(RandomWord());
      setBoxContents(Array(4).fill(''));
      // window.location.reload();
    } else {
      alert("Incorrect word");
    }
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
      <h1>Drag Activity - Level {level}</h1>
      <div className="vertical-flex" style={{ touchAction: 'none' }}>
        <AudioIcon word={currentWord} /> {/* Pass the current word */}
        <LetterGrid currentWord={currentWord} arraySize={9} />
        <DroppableBox
          count={4}
          maxCount={6}
          boxContents={boxContents}
          updateBoxContent={updateBoxContent}
        />
        <p>{dragOverMessage}</p> {/* Display drag over message */}
        <button onClick={handleDoneClick}>Done</button>
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
  const wordsList = [
    'book', 'tree', 'game', 'star', 'lamp'
  ];

  const wordIndex = Math.floor(Math.random() * wordsList.length);
  return wordsList[wordIndex];
}
