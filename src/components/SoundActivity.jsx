// src/components/SoundActivity.jsx
import { Link, useParams } from 'react-router-dom';
import '../styles/App.css'
import { Word } from './Words'

function SoundActivity() {
  const { level } = useParams();

  return (
    <>
    <h1>Dyslexia App</h1>
    <h1>Sound Activity - Level {level}</h1>

    <h2>CLICK ME!!!</h2>

    <Word wordText = "Mip" />
    <Word wordText = "Blon" />
    <Word wordText = "Gup" />
    </>
  )
}

export default SoundActivity