import { useParams } from "react-router-dom";
import useGames from "../../hooks/useGame";
import { useEffect, useState } from "react";
import QuizPlay from "./quiz/QuizPlay";

export default function Room() {
  const { gameId } = useParams();
  const { getGame } = useGames();
  const [game, setGame] = useState({});
  const [showQuiz, setShowQuiz] = useState(false)

  useEffect(() => {
    getGame(gameId).then((res) => setGame(res));
  }, []);

  console.log(game);

  if (game.game_type && game.game_type.name === 'Preguntas y respuestas') {
    return (
      <div>
        {!showQuiz && <button onClick={() => setShowQuiz(true)}>Comenzar</button>}
        {showQuiz && <QuizPlay questions={game.data} />}
      </div>
    );
  }

  return <div>{game.description}</div>;
}
