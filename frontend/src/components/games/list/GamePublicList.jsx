import { useState } from "react";
import useGameList from "../../../hooks/useGameList";
import GameItemPublic from "./GameItemPublic";

export default function GamePublicList() {
  const [edit, setEdit] = useState({});
  const { games } = useGameList();
  return (
    <div className="bg-gray-100 min-h-full"><br></br><h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">LISTADO DE JUEGOS DISPONIBLES</h1>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {games.map((user) => (
            <GameItemPublic
              key={user._id}
              game={user}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
