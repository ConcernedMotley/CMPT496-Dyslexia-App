import "../styles/App.css";

export default function AudioIcon({ word }) {
    const playSound = () => {
        if (!word) return; // Prevent errors if word is not set
        console.log("clicked sound"); // Log the click
        const audio = new Audio(`${import.meta.env.BASE_URL}audio/words/${word}.wav`);
        audio.play();
    };

    return (
        <div 
            className="icon" 
            onClick={playSound} 
            role="button" 
            aria-label={`Play sound for ${word}`}
        >
            <img src={`${import.meta.env.BASE_URL}images/volumeUp.svg`} alt="Spell Word" />
        </div>
    );
}
