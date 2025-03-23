import ReactSlider from "react-slider";
import React, {useState} from "react";

export default function SoundSlider({value, onChange}) {
    
    // const [value, setValue] = useState(0);
    
    return (
        <div className="vertical-flex slider-card">
            <ReactSlider
            
                className="sound-slider"
                trackClassName="sound-slider-track"
                thumbClassName="sound-slider-thumb"
                markClassName="sound-slider-mark"
                value={value}
                min={0}
                max={6}
                step={1}
                onChange={onChange}
                marks={1}

            />
        </div>
    );
}