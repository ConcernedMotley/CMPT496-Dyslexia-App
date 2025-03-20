import React, { useState } from 'react';
import tutSymbol from '../../assets/tut.svg';

const OddTutorial = () => {
  const [step, setStep] = useState(0); // Track tutorial step
  const totalSteps = 3;

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }else {
        closeTutorial(); // Close tutorial on the last step
      }
  };

  const closeTutorial = () => {
    setStep(0); // Reset tutorial
  };

  return (
    <div className="tutorial-container">
      {/* Help Button */}
      <img 
        className='tut-symb' 
        src={tutSymbol} 
        alt="Help Button" 
        onClick={() => setStep(1)} 
      />

      {/* Overlay with blur effect when tutorial is active */}
      {step > 0 && (
        <div className="overlay" onClick={nextStep}>
          <div className={`focus ${step === 1 ? "focus-plate" : step === 2 ? "focus-dropzone" : "focus-check"}`} />

          {/* Speech Bubble */}
          <div className="speech-bubble">
          <h3 className='speech-header'>Tutorial ({step}/{totalSteps})</h3>
            {step === 1 && "These are the matching words, one stands out."}
            {step === 2 && "Drag the mismatched word into this box."}
            {step === 3 && "Select \"done\" to submit your answer."}
          </div>

          
        </div>
      )}
    </div>
  );
};

export default OddTutorial;
