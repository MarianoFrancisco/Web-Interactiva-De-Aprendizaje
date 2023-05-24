import { useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import useAuth from "./useAuth";
import AuthContext from "../context/AuthProvider";

const socket = io.connect("http://localhost:5010");

const useSocket = (codeInit = 0, usernameInit = "guest") => {
  const { auth } = useContext(AuthContext);
  const [players, setPlayers] = useState([]);
  const [game, setGame] = useState({});
  const [code, setCode] = useState(codeInit);
  const [error, setError] = useState("");

  const createRoomCode = (game) => {
    return new Promise((resolve, reject) => {
      socket.emit("new_code", { roles: auth.roles, game });
      socket.on("new_game", (data) => {
        const { code } = data;
        setCode(code);
        resolve(code);
      });
    });
  };

  const joinRoom = (code, username = auth.username || usernameInit) => {
    socket.emit("join", { clave: code, user_name: username });
    return new Promise((resolve, reject) => {
      socket.emit("join", { clave: code, user_name: username });
      socket.on("new_game", (data) => {
        const { code, game } = data;
        setCode(code);
        setGame(game);
        resolve(game);
      });
    });
  };

  const getGameData = () => {
    return new Promise((resolve, reject) => {
      socket.emit("new_code", { roles: auth.roles, game });
      socket.on("new_game", (data) => {
        const { code } = data;
        setCode(code);
        resolve(code);
      });
    });
  }

  useEffect(() => {
    joinRoom(code);

    socket.on("new_game", (data) => {
      console.log('desde new game front')
      console.log(data.code)
      console.log(data.game)
      setGame(data.game);
    });

    socket.on("joinError", (message) => {
      setError(message || "");
    });

    socket.on("lobbyUsers", (data) => {
      setPlayers(data.filter(username => username !== auth.username));
    });

  }, [socket]);

  return {
    players,
    code,
    game,
    error,
    createRoomCode,
    joinRoom
  };
};

export default useSocket;
