{/*defines routes for ** */}
// src/App.jsx
import React from 'react';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './components/HomePage';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import LandingPage from './components/LandingPage';
import PlayPage from './components/PlayPage';
import LevelLibrary from './components/LevelLibrary';
import DragActivity from './components/DragActivity';
import SoundActivity from './components/SoundActivity';
import OddActivity from './components/OddActivity';
import WordCollection from './components/WordCollection';
import DraggingGame from './components/DraggingGame';


// Detect if the device supports touch
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

function App() {
  return (
    <DndProvider backend={isTouchDevice ? TouchBackend : HTML5Backend}>
      <Router basename='/ateam4'>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/RegisterPage" element={<RegisterPage />} />
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/LandingPage" element={<LandingPage />} />
          <Route path="/PlayPage" element={<PlayPage />} />
          <Route path="/LevelLibrary" element={<LevelLibrary />} />
          <Route path="/DragActivity" element={<DragActivity />} />
          <Route path="/SoundActivity" element={<SoundActivity />} />
          <Route path="/OddActivity" element={<OddActivity />} />
          <Route path="/WordCollection" element={<WordCollection />} />
          <Route path="/DraggingGame" element={<DraggingGame />}/> 
        </Routes>
      </Router>
    </DndProvider>
  );
}

export default App;



