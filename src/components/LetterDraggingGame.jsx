import React, { useState } from 'react';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';

function LetterDraggingGame() {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F']; // List of letters
  const [droppedLetters, setDroppedLetters] = useState({}); // Track where letters are dropped

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over) {
      const updatedLetters = { ...droppedLetters };

      // Return letter to pick-up area if dropped back on the pick-up zone
      if (over.id === 'pickup-area') {
        delete updatedLetters[active.id];
      } else {
        updatedLetters[active.id] = over.id;
      }

      setDroppedLetters(updatedLetters);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Letter Drag & Drop Game</h2>
      <DndContext onDragEnd={handleDragEnd}>
        <div style={styles.gridArea}>
          <Droppable id="pickup-area" droppedLetters={droppedLetters}>
            {letters
              .filter((letter) => !droppedLetters[letter])
              .map((letter) => (
                <Draggable key={letter} id={letter} />
              ))}
          </Droppable>
        </div>

        <div style={styles.dropZoneContainer}>
          {[1, 2, 3, 4].map((zone) => (
            <Droppable
              key={`drop-zone-${zone}`}
              id={`drop-zone-${zone}`}
              droppedLetters={droppedLetters}
            >
              {Object.entries(droppedLetters).map(
                ([letter, zoneId]) =>
                  zoneId === `drop-zone-${zone}` && (
                    <Draggable key={letter} id={letter} />
                  )
              )}
            </Droppable>
          ))}
        </div>
      </DndContext>
    </div>
  );
}

function Draggable({ id }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = {
    ...styles.draggable,
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : 'none',
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {id}
    </div>
  );
}

function Droppable({ id, droppedLetters, children }) {
  const { isOver, setNodeRef } = useDroppable({ id });

  const style = {
    ...styles.droppable,
    backgroundColor: isOver ? '#bde0fe' : '#e0e0e0',
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children.length ? children : id === 'pickup-area' ? 'Pick Up Letters' : 'Drop Here'}
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  gridArea: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
    gap: '10px',
    padding: '10px',
    marginBottom: '30px',
  },
  draggable: {
    padding: '20px',
    backgroundColor: '#a0c4ff',
    borderRadius: '12px',
    cursor: 'grab',
    width: '80px',
    height: '80px',
    fontSize: '32px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    userSelect: 'none',
    touchAction: 'none',
  },
  dropZoneContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
  },
  droppable: {
    margin: '0 auto',
    height: '150px',
    width: '150px',
    backgroundColor: '#e0e0e0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '12px',
    transition: 'background-color 0.3s ease',
  },
};

export default LetterDraggingGame;
