import AudioIcon from '../AudioIcon';

export default function PlaySoundCard ({word}) {
    return (
        <div className="horizontal-flex audio-card">
            <AudioIcon word = {word} />
            <p >Play the sound and spell the word! Get 7/10 correct to get to the next round.</p>

        </div>
    );
}