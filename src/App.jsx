import { useState, useEffect } from "react";
import Header from "./components/header";
import Card from "./components/card";
import "./styles/App.css";

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [cards, setCards] = useState([]);

  const handleClick = () => {
    setScore(score + 1);
    shuffleCards(cards);
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
      fetch("https://pokeapi.co/api/v2/pokemon?limit=16")
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
          console.log(pokemonDetails);
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
              imageUrl={card.imageUrl}
              onClick={handleClick}
            />
          ))}
        </div>
      </main>
    </>
  );
}

export default App;
