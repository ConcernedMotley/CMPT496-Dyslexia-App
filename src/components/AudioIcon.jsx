import "../styles/App.css"

export default function AudioIcon() {
    return (
        <div className="icon">
            <img src={`${import.meta.env.BASE_URL}images/volumeUp.svg`} alt="Spell Word" />
        </div>
    );
}
