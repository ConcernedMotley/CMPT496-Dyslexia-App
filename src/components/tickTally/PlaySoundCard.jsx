import AudioIcon from '../AudioIcon';

export default function PlaySoundCard () {
    return (
        <div className="horizontal-flex audio-card">
            <AudioIcon word = {'book'} />
            <p >Play the sound and count the phonemes! Score 7/10 or higher to get the next round.</p>

        </div>
    );
}