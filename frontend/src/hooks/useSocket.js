import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import useAuth from "./useAuth";

const socket = io.connect("http://localhost:5010");

const useSocket = () => {
  const { auth } = useContext(AuthContext);
  const [players, setPlayers] = useState([]);
  const [code, setCode] = useState(0);

  const createRoomCode = () => {
    socket.emit("auth", auth.roles);
    socket.on("Clave de Lobby", (code) => setCode(code));
  };

  const joinRoom = () => {};

  useEffect(() => {
    socket.on("lobbyUsers", (data) => {
      setPlayers(data);
    });
  }, [socket]);

  return {
    players,
    code,
  };
};

export default useSocket;
