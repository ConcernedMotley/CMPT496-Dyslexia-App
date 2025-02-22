import React, { useState } from 'react';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import LetterGrid from './draggingGame/LetterGrid';
import DroppableBox from './draggingGame/DroppableBox';
import AudioIcon from './AudioIcon';
import '../styles/DraggingGame.css';
import '../styles/pageStyle.css';

export default function DraggingGame() {
  const [activeLetter, setActiveLetter] = useState(null);

  const handleDragStart = (event) => {
    setActiveLetter(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { over, active } = event;
    if (over) {
      console.log(`Letter ${active.id} dropped on ${over.id}`);
    }
    setActiveLetter(null);
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="vertical-flex">
        <AudioIcon />
        <LetterGrid />
        <DroppableBox />
        <button>Done</button>
      </div>

      {/* Enables free movement */}
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
