import { func } from 'prop-types';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import ProgressTracker from '../ProgressTracker';
import PlaySoundCard from './PlaySoundCard';
import SoundSlider from './SoundSlider';


export default function TickTally(){

    const { level } = useParams();

    return (
        <div className='horizontal-flex'> 
            <div className='vertical-flex'>
                <ProgressTracker />
                <h1 className='title-font'>Tick Tally Level: {level}</h1>
                <PlaySoundCard />
                <SoundSlider />

                <button>Done</button>
                
            </div>
        </div>
    );
};