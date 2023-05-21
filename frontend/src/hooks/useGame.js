import { useEffect, useState } from "react";
import axios from "../api/axios";
import useAxiosPrivate from "./useAxiosPrivate";

const GAME_URL = "/game";

const useGames = () => {
  const axiosPrivate = useAxiosPrivate();
  const [games, setGames] = useState([]);

  const insertGame = async (game) => {
    return axiosPrivate
      .post(`${GAME_URL}/add-game`, game)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        return error;
      });
  };

  const updateGame = (id, game) => {
    axiosPrivate
      .patch(`${GAME_URL}/update-game/${id}`, game, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getGamesByUser = (id) => {
    axiosPrivate
      .get(`${GAME_URL}/getByUser/${id}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => setGames(res.data))
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getGamesByUser();
  }, []);

  return {
    games,
    insertGame,
    updateGame,
    getGamesByUser,
  };
};

export default useGames;
