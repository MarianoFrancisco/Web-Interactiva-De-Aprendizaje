import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import QuizPlay from "../games/quiz/QuizPlay";
import UnscramblePlay from "../games/unscramble/UnscramblePlay";
import MemoryPlay from "../games/memory/MemoryPlay";
import HangmanPlay from "../games/hangman/HangmanPlay";
import Button from "../form/Button";
import useSocket from "../../hooks/useSocket";

export default function Room() {
  const {code} = useParams();
  const {game:game1, error, joinRoom} = useSocket(code);
  const [showGame, setShowGame] = useState(false);
const [game, setGame] = useState(null);
  useEffect(()=> {
    joinRoom(code).then(res=> console.log(res));
    console.log('estoy uniendome a una sala en mi propio navegador')
  },[])

  if (!game) {
    return <p>No hay juegos listos para jugar</p>;
  }

  if (showGame && game.game_type) {
    if (game.game_type.name === "Preguntas y respuestas")
      return (
        <div>
          <QuizPlay questions={game.data} />
        </div>
      );
    else if (game.game_type.name === "Descifrado")
      return (
        <div>
          <UnscramblePlay words={game.data} />
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
    !showGame && (
      <div className="w-3/4 mt-14 md:w-1/2 mx-auto">
        <div className="card h-32 rounded-lg text-center bg-cyan-500 p-4 mb-4 flex items-center justify-center">
          <h3 className="text-xl font-bold text-white">Nueva sala para <br />{game.name ? game.name: 'no'}</h3>
        </div>
        <div className="card h-20 rounded-lg text-center bg-indigo-500 p-4 mb-4 flex items-center justify-center">
          <h3 className="text-xl font-bold text-white">Codigo <br /> <span className="text-cyan-500">{` hola`}</span></h3>
        </div>
          <Button onClick={() => setShowGame(true)}>
            Iniciar
          </Button>
      </div>
    )
  );
}
