import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faPlay,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../../context/AuthProvider";
import { ROLES } from "../../../App";

export default function GameItemPublic({ game }) {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const play = (id) => {
    // navigate(`/room/${id}`);
    navigate("/room", { state: game });
  };
  return (
    <div className="group bg-white p-3 rounded-xl flex flex-col">
      <div>
        <span className="bg-emerald-100 text-sm p-1 rounded-lg">
          {game.game_type.name}
        </span>
        <h3 className="mt-4 text-sm text-gray-700">{game.description}</h3>
      </div>
      <div className="flex justify-between mt-auto">
        <div className="text-lg font-medium text-gray-900">{game.name}</div>
        <div className="space-x-1">
        <button
              className="items-center justify-center rounded-md border border-transparent bg-emerald-600 p-1 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              onClick={() => play(game._id)}
            >
              <FontAwesomeIcon icon={faPlay} className="block h-6 w-6" />
            </button>
        </div>
      </div>
    </div>
  );
}
