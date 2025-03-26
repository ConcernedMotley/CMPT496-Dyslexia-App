import ReactSlider from "react-slider";
import React, {useState} from "react";

export default function SoundSlider({value, onChange}) {
    
    // const [value, setValue] = useState(0);
    const min = 0;
    const max = 6;
    const step = 1;


    
    return (
        <div className="slider-card">
            <ReactSlider
            
                className="sound-slider"
                trackClassName="sound-slider-track"
                thumbClassName="sound-slider-thumb"
                markClassName="sound-slider-mark"
                value={value}
                min={min}
                max={max}
                step={1}
                onChange={onChange}
                marks={1}

            />

                        {/* Number labels under the slider */}
                        <div className="slider-labels">
                {Array.from({ length: max - min + 1 }, (_, i) => (
                    <span key={i} className="slider-label">
                        {i + min}



                    </span>
                ))}
            </div>

        </div>
    );
}