import { useEffect, useState } from "react";
import axios from "../api/axios";
import useAxiosPrivate from "./useAxiosPrivate";

const GAME_TYPE_URL = "/gameType";
const useGameTypes = () => {
  const [gameTypes, setGameTypes] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  const getAllGameTypes = () => {
    axios
      .get(`${GAME_TYPE_URL}/get-types`)
      .then((res) => setGameTypes(res.data))
      .catch((err) => console.log(err));
  };

  const deleteGameType = (id) => {
    axiosPrivate
      .delete(`${GAME_TYPE_URL}/delete-type/${id}`)
      .then((res) => {
        getAllGameTypes();
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllGameTypes();
  }, []);

  return {
    gameTypes,
    getAllGameTypes,
    deleteGameType,
  };
};

export default useGameTypes;
