import { useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";

const GAME_URL = "/game";

const useGames = () => {
  const axiosPrivate = useAxiosPrivate();
  const [games, setGames] = useState([]);

  const getGame = async (id) => {
    return axiosPrivate
      .get(`${GAME_URL}/${id}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
  };

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

  const updateGame = async (game) => {
    return axiosPrivate
      .patch(GAME_URL, game)
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

  const getProfileGames = () => {
    axiosPrivate
      .get(`${GAME_URL}/profile/games`)
      .then((res) => setGames(res.data))
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteGame = async (id) => {
    await axiosPrivate
      .delete(`${GAME_URL}/delete-game/${id}`)
      .catch((err) => {
        console.log(err);
      });
      getProfileGames(id);
  };

  useEffect(() => {
    getProfileGames();
  }, []);

  return {
    games,
    insertGame,
    updateGame,
    getGamesByUser,
    deleteGame,
    getGame,
  };
};

export default useGames;
