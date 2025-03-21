import React from "react";
import "../../styles/general_style.css"; // Import CSS for styling

import correct_sticker from '../../assets/correct.svg'
import wrong_sticker from '../../assets/wrong.svg'

const AnswerBadge = ({ result, correctAnswer, onClose }) => {
  const isCorrect = result === 1;


  return (
    <div className="badge-overlay" onClick={onClose}>
      <div className="badge-content">
        <img
          src={isCorrect ? correct_sticker : wrong_sticker}
          alt={isCorrect ? "Correct!" : "Try Again!"}
          className="badge-img"
        />
        {result === 0 && (
          <p className="correct-answer-text">
            {correctAnswer}
          </p>
        )}
        
      </div>
    </div>
  );
};

export default AnswerBadge;