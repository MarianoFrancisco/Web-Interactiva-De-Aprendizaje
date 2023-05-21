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
      .patch(`${GAME_URL}/update-game/${id}`, game)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getGamesByUser = (id) => {
    axiosPrivate
      .get(`${GAME_URL}/getByUser/${id}`)
      .then((res) => setGames(res.data))
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteGame = (id) => {
    axiosPrivate
      .delete(`${GAME_URL}/delete-game/${id}`)
      .then((res) => {
        getGamesByUser(id)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getGamesByUser();
  }, []);

  return {
    games,
    insertGame,
    updateGame,
    getGamesByUser,
    deleteGame
  };
};

export default useGames;
