import { useLocation, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import QuizPlay from "./quiz/QuizPlay";
import LetterSoupPlay from "./letterSoup/LetterSoupPlay";
import MemoryPlay from "./memory/MemoryPlay";
import Button from "../form/Button";

const socket = io.connect("http://localhost:5010");

export default function Room() {
  const { state } = useLocation();
  const game = state;
  const [showGame, setShowGame] = useState(false);

  const startGame = () => {

  }

  if (!game) {
    return <p>No se ha seleccionado ningun juego</p>;
  }

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
  }

  return (
    !showGame && (
      <div className="w-3/4 mt-14 md:w-1/2 mx-auto">
        <div className="card h-32 rounded-lg text-center bg-cyan-500 p-4 mb-4 flex items-center justify-center">
          <h3 className="text-xl font-bold text-white">Nueva sala para <br />{game.name}</h3>
        </div>
        <div className="card h-20 rounded-lg text-center bg-indigo-500 p-4 mb-4 flex items-center justify-center">
          <h3 className="text-xl font-bold text-white">Codigo <br /> <span className="text-cyan-500">{` hola`}</span></h3>
        </div>
          <Button>
            Iniciar
          </Button>
      </div>
    )
  );
}
