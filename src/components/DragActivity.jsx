// src/components/DragActivity.jsx
import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import '../styles/DragActivityStyle.css';

const ItemType = 'box'; // Identifier for draggable items

// Draggable Box Component
function DraggableBox({ id, text }) {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: ItemType,
      item: { id },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }));
  
    return (
      <div
        ref={drag}
        className="box"
        style={{ opacity: isDragging ? 0.5 : 1 }}
      >
        {text}
      </div>
    );
  }
  
  // Target Rectangle Component
  function TargetRectangle({ acceptBox }) {
    const [droppedBoxes, setDroppedBoxes] = useState([]);
  
    const [, drop] = useDrop(() => ({
      accept: ItemType,
      drop: (item) => {
        if (droppedBoxes.length < 3) {
          setDroppedBoxes((prev) => [...prev, item.id]);
        }
      },
    }));
  
    return (
      <div
        ref={drop}
        className={`target-rectangle ${droppedBoxes.length === 3 ? 'completed' : ''}`}
      >
        {droppedBoxes.length === 3 ? <p>Goal Achieved!</p> : <p>Drag 3 boxes here</p>}
        <div className="dropped-boxes">
          {droppedBoxes.map((id) => (
            <div key={id} className="dropped-box">
              Box {id}
            </div>
          ))}
        </div>
      </div>
    );
  }

function DragActivity() {
  return (
    <div className="activity-container">
      <h1>Drag 3 Boxes into the Goal Area!</h1>
      <div className="boxes-container">
        <DraggableBox id={1} text="Box 1" />
        <DraggableBox id={2} text="Box 2" />
        <DraggableBox id={3} text="Box 3" />
        <DraggableBox id={4} text="Box 4" />
        <DraggableBox id={5} text="Box 5" />
      </div>
      <TargetRectangle />
    </div>
  );
}

export default DragActivity;