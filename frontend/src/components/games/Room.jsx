import { useParams } from "react-router-dom";
import useGames from "../../hooks/useGame";
import { useEffect, useState } from "react";
import QuizPlay from "./quiz/QuizPlay";
import LetterSoupPlay from "./letterSoup/LetterSoupPlay";
import MemoryPlay from "./memory/MemoryPlay";
import HangmanPlay from "./hangman/HangmanPlay";

export default function Room() {
  const { gameId } = useParams();
  const { getGame } = useGames();
  const [game, setGame] = useState({});
  const [showGame, setShowGame] = useState(false);

  useEffect(() => {
    getGame(gameId).then((res) => setGame(res));
  }, []);

  console.log(game);

  if (showGame && game.game_type) {
    if (game.game_type.name === "Preguntas y respuestas")
      return (
        <div>
          <QuizPlay questions={game.data} />
        </div>
      );
    else if (game.game_type.name === "Sopa de letras")
      return (
        <div>
          <LetterSoupPlay words={game.data} />
        </div>
      );
      else if (game.game_type.name === "Memoria")
      return (
        <div>
          <MemoryPlay couples={game.data} />
        </div>
      );
      else if (game.game_type.name === "Ahorcado")
      return (
        <div>
          <HangmanPlay questions={game.data} />
        </div>
      );
  }

  return (
    !showGame && <button onClick={() => setShowGame(true)}>Comenzar</button>
  );
}
