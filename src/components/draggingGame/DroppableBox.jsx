import React from 'react';
import { useDroppable } from '@dnd-kit/core';

export default function DroppableBox({ count = 4, maxCount = 6, boxContents, updateBoxContent, boxColors }) {
  // Max count
  if (count > maxCount) count = maxCount;

  // Generate DropBox components dynamically
  const dropBoxes = [];
  for (let i = 0; i < count; i++) {
    dropBoxes.push(
      <DropBox
        key={i}
        boxId={i}
        content={boxContents[i]}
        updateContent={updateBoxContent}
        color={boxColors[i]}
      />
    );
  }

  return <div className="horizontal-flex">{dropBoxes}</div>;
}

function DropBox({ boxId, content, updateContent, color }) {
  const { isOver, setNodeRef } = useDroppable({
    id: `dropBox-${boxId}`,
  });

  return (
    <div className="drop-box" id={boxId} key={boxId} ref={setNodeRef} style={{ backgroundColor: color }}>
      {content}
    </div>
  );
}