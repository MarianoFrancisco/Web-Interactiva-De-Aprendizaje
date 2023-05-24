import { useEffect, useState } from 'react';
import useAxiosPrivate from "./useAxiosPrivate";
import axios from "../api/axios";

const RESULT_URL = '/result';
const useResult = () => {
    const axiosPrivate = useAxiosPrivate();
    const [resultsForGame, setResultsForGame] = useState([]);
    const [resultsByUser, setResultsByUser] = useState([]);
    const insertResult = (result) => {
        axiosPrivate
            .post(`${RESULT_URL}/add-result`, result, {
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

    const getResultsForGame = (id) => {
        return axios
          .get(`${RESULT_URL}/get-for-game/${id}`)
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            console.log(error);
            return null;
          });
      };

    const getResultsByUser = (id) => {
        axiosPrivate
            .get(`${RESULT_URL}/get-by-user/${id}`)
            .then((res) => setResultsByUser(res.data))
            .catch((err) => {
                console.log(err);
            });
    };

    return {
        resultsForGame,
        resultsByUser,
        insertResult,
        getResultsForGame,
        getResultsByUser
    };
};

export default useResult;
