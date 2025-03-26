// Popup box component

export default function PopUpBox({handleAccept, gameTitle, instructions}) {

    return(
        <div className="popup-game-overlay">
            <div className="popup-game-box">
                <h2 className='game-title'>{gameTitle}</h2>

                <p className='instruction'> {instructions} </p>
                <div className="popup-button">
                    <button onClick={handleAccept} className="next-button purple-button">Next</button>
                </div>
            </div>
        </div>
    )
}