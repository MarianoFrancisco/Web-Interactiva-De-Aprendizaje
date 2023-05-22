import { io } from "socket.io-client";
import { useEffect, useState } from "react";

//se escucha el socket en el puerto indicado
const socket = io("http://localhost:5010");

export default function RoomTest() {
  const [isConnected, setIsConnected] = useState(false);
  useEffect(() => {    
    socket.on("connect", () => {
      setIsConnected(true)
    });
  }, []);
  return (
    <div>
      <h2 className="font-bold text-2xl text-emerald-950">
        {isConnected ? "Estoy conectado" : "NO CONECTADO"}
      </h2>
    </div>
  );
}
