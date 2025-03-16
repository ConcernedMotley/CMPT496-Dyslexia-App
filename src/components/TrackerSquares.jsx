//component for the tracking of right and wrong answers
import React from "react";
import "../styles/general_style.css"; // style is in general

//TODO IDK i cant see them...
const TrackerSquares = () => {
    return (
        <div className="tracker-container">
            {[...Array(10)].map((_, index) => (
                <div key={index} className={`tracker tracker-${index + 1}`}></div>
            ))}
        </div>
    );
};

export default TrackerSquares;