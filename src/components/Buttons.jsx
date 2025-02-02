import PropTypes from "prop-types";

export function Button01 ({buttonText}) {

    return (
        <>
        <h1>{buttonText} I am button 01!</h1>
        </>
    )
}

export function Button02 ({buttonText, secondText}) {
    return (
        <>
        <h1>{buttonText} I am button 02!</h1>
        <h2>{secondText}, this is the second text!</h2>
        </>
    )
}

Button01.propTypes = {
    buttonText: PropTypes.string.isRequired,
}

Button02.propTypes = {
    buttonText: PropTypes.string.isRequired,
    secondText: PropTypes.string.isRequired
}