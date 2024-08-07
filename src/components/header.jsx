/* eslint-disable react/prop-types */
export default function Header({score, bestScore}) {
    return (
        <header>
            <h1>Memory Game</h1>
            <strong>Click on an image once to increase your score.</strong>
            <p>{`Score: ${score}`}</p>
            <p>{`Best score: ${bestScore}`}</p>
        </header>
    )
}