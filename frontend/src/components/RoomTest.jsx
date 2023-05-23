import { io } from "socket.io-client";
import { useEffect, useState } from "react";

//se escucha el socket en el puerto indicado
const socket = io("http://localhost:5010");

export default function RoomTest() {
  const [isConnected, setIsConnected] = useState("");
  const rol = 1580;
  const auth = () => {
    socket.emit('auth', { rol });
  }

  useEffect(() => {    
    socket.on('auth', (data) => {
      setIsConnected(data.rol);
    });
  }, [socket]);
  return (
    <div>
      <h2 className="font-bold text-2xl text-emerald-950">
        {isConnected ? "Estoy conectado" : "NO CONECTADO"}
      </h2>
      <button onClick={auth()}>asdfasdf</button>
    </div>
  );
}
