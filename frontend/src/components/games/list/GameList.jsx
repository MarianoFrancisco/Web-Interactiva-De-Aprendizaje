import { useState } from "react";
import useGames from "../../../hooks/useGame";
import GameItem from "./GameItem";

export default function GameList() {
  const [edit, setEdit] = useState({});
  const { games, deleteGame } = useGames();
  return (
    <div className="bg-gray-100 min-h-full">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Juegos</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {games.map((user) => (
            <GameItem
              key={user._id}
              game={user}
              deleteGame={deleteGame}
              setEdit={setEdit}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
