// src/components/DragActivity.jsx
//word snap game
import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Link, useParams } from 'react-router-dom';
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
  function TargetRectangle({ droppedBoxes, setDroppedBoxes }) {
    const [, drop] = useDrop(() => ({
      accept: ItemType,
      drop: (item) => {
        if (droppedBoxes.length < 3) {
          setDroppedBoxes((prev) => [...prev, item.id]); // Add dropped box
        }
      },
    }));

    // Function to remove the last dropped box (Undo)
    const undoLastDrop = () => {
        if (droppedBoxes.length > 0) {
            setDroppedBoxes((prev) => prev.slice(0, -1)); // Remove the last box
        }
    };

    return (
      <div
        ref={drop}
        className={`target-rectangle ${droppedBoxes.length === 3 ? 'completed' : ''}`}
      >
        {droppedBoxes.length === 3 ? <p>Goal Achieved!</p> : <p>Build word here</p>}
        <div className="dropped-boxes">
          {droppedBoxes.map((id) => (
            <div key={id} className="dropped-box">
              Box {id}
            </div>
          ))}
        </div>
        <button className='undo-button' onClick={undoLastDrop} disabled={droppedBoxes.length === 0}>
          Undo
        </button>
      </div>
  
    
    );
  }

function DragActivity() {
  const [droppedBoxes, setDroppedBoxes] = useState([]); // Manage dropped boxes in the parent
  const { level } = useParams();

  return (
    <div className="activity-container">
      <h1>Drag Activity - Level {level}</h1>
      <h1>Drag 3 Boxes into the Goal Area!</h1>
      <button>Audio</button>
      <div className="boxes-container">
        {/*TODO the selected word fill random boxes with letters then fill the rest with random letters */}
        <DraggableBox id={1} text="Box 1" />
        <DraggableBox id={2} text="Box 2" />
        <DraggableBox id={3} text="Box 3" />
        <DraggableBox id={4} text="Box 4" />
        <DraggableBox id={5} text="Box 5" />
        <DraggableBox id={6} text="Box 6" />
        <DraggableBox id={7} text="Box 7" />
        <DraggableBox id={8} text="Box 8" />
        <DraggableBox id={9} text="Box 9" />
        <DraggableBox id={10} text="Box 10" />
      </div>
      {/*TODO a target box for each letter? can do a map of the array to dynamically change the # of boxes*/}
      <TargetRectangle droppedBoxes={droppedBoxes} setDroppedBoxes={setDroppedBoxes} />
      <button>Submit</button>
  
      <Link to="/PlayPage">
       <button className="back-button">Quit!</button>
      </Link>
    </div>
    
    
  );
}

export default DragActivity;