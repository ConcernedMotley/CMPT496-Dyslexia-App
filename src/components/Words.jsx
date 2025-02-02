import PropTypes from "prop-types";
import '../styles/words.css'
import '../styles/colors.css'
import Blon from '../audio/Blon.wav'

// Speech To Text
// https://console.cloud.google.com/vertex-ai/studio/speech

export function Word ({wordText}) {

    const playSound = () => {
        const audio = new Audio(Blon);
        audio.play();
      };

return (
    <div className="wordDiv" onClick={playSound}>
        <p className="wordText">{wordText}</p>
    </div>
)

}

Word.propTypes = {
    wordText: PropTypes.string.isRequired,
}

