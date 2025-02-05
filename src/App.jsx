{/*defines routes for ** */}
// src/App.jsx
import React from 'react';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import DragActivity from './components/DragActivity';
import SoundActivity from './components/SoundActivity';

// Detect if the device supports touch
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

function App() {
  return (
    <DndProvider backend={isTouchDevice ? TouchBackend : HTML5Backend}>
      <Router basename='/CMPT496-Dyslexia-App'>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/DragActivity" element={<DragActivity />} />
          <Route path="/SoundActivity" element={<SoundActivity />} />
        </Routes>
      </Router>
    </DndProvider>
  );
}

export default App;









{/*import './styles/App.css'
import { Word } from './components/Words'

function App() {

  return (
    <>
    <h1>Dyslexia App</h1>

    <h2>CLICK ME!!!</h2>

    <Word wordText = "Mip" />
    <Word wordText = "Blon" />
    <Word wordText = "Gup" />
    </>
  )
}

export default App*/}
