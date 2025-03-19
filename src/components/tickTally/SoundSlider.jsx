import ReactSlider from "react-slider";

export default function SoundSlider() {
    return (
        <div className="horizontal-flex sound-slider">
            <ReactSlider
            
                className="tick-tally-slider"
                trackClassName="tick-tally-slider-track"
                thumbClassName="tick-tally-slider-thumb"
                markClassName="tick-tally-slider-mark"
                marks={1}
                min={0}
                max={7}

            />
        </div>
    );
}