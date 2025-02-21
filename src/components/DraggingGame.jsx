import React from 'react';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import '../styles/DraggingGame.css'
import '../styles/pageStyle.css'
import LetterGrid from './draggingGame/LetterGrid';
import AduioIcon from './AudioIcon';


export default function DraggingGame() {

  return (
    <>
    <div className='vertical-flex'>
      <AduioIcon />
      <LetterGrid />
    </div>
    </>
  )
  
}
