import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useSocket from "../../hooks/useSocket";
import Button from "../form/Button";

export default function NewRoom() {
  const { state: game } = useLocation();
  const { createRoomCode } = useSocket();
  const navigate = useNavigate();
  const newRoom = () => {
    createRoomCode(game).then((res) => navigate(`/room/${res}`));
  };

  return (
    <div className="w-3/4 mt-14 md:w-1/2 mx-auto">
      <div className="card h-32 rounded-lg text-center bg-cyan-500 p-4 mb-4 flex items-center justify-center">
        <h3 className="text-xl font-bold text-white">
          Nueva sala para <br />
          {game.name}
        </h3>
      </div>
      <Button onClick={() => newRoom(true)}>Crear Sala</Button>
    </div>
  );
}
