import { useState, useEffect } from "react";
import Header from "./components/header";
import Card from "./components/card";
import "./styles/App.css";

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [cards, setCards] = useState([]);
  const [clickedIds, setClickedIds] = useState([]);

  const handleClick = (card) => {
    if (!clickedIds.includes(card.id)) {
      setScore(score => score + 1);
      shuffleCards(cards);
      setClickedIds([...clickedIds, card.id])
    } else {
      if(score > bestScore) setBestScore(score);
      setScore(0);
      setClickedIds([]);
    }
  };

  const shuffleCards = (arr) => {
    const shuffledArr = arr
      .map((val) => ({ val, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map((value ) => value.val);
    setCards(shuffledArr);
  };

  useEffect(() => {
    let ignore = false;

    const fetchPokemonData = () => {
      fetch("https://pokeapi.co/api/v2/pokemon?limit=12")
        .then((response) => response.json())
        .then((response) => {
          const pokemonPromises = response.results.map((result) =>
            fetch(result.url)
              .then((response) => response.json())
              .then((pokemonData) => ({
                id: pokemonData.id,
                name: pokemonData.name,
                imageUrl: pokemonData.sprites.front_default,
              }))
          );

          return Promise.all(pokemonPromises);
        })
        .then((pokemonDetails) => {
          if (!ignore) setCards(pokemonDetails);
        })
        .catch((error) => console.log(error));
    };

    fetchPokemonData();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      <Header score={score} bestScore={bestScore} />
      <main>
        <div className="grid">
          {cards.map((card) => (
            <Card
              key={card.id}
              text={card.name}
              imgUrl={card.imageUrl}
              onClick={() => handleClick(card)}
            />
          ))}
        </div>
      </main>
    </>
  );
}

export default App;
