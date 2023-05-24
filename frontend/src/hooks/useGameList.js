import { useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import axios from "../api/axios";

const GAME_URL = "/game";

const useGameList = () => {
  const [games, setGames] = useState([]);

  const getAllGames = () => {
    axios
      .get(GAME_URL)
      .then((res) => {
        setGames(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllGames();
  }, []);

  return {
    games,
    getAllGames
  };
};

export default useGameList;
