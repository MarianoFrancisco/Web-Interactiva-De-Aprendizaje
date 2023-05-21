import { useEffect } from 'react';
import useAxiosPrivate from "./useAxiosPrivate";

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
        axiosPrivate
            .get(`${RESULT_URL}/get-for-game/${id}`)
            .then((res) => setResultsForGame(res.data))
            .catch((err) => {
                console.log(err);
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

    const deleteResult = async (id) => {
        axiosPrivate
            .delete(`${RESULT_URL}/delete-result/${id}`)
            .then((res) => {
                getResultsForGame();
                return res.data;
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getResultsForGame();
        getResultsByUser();
    }, []);

    return {
        resultsForGame,
        resultsByUser,
        insertResult,
        getResultsForGame,
        getResultsByUser,
        deleteResult,
    };
};

export default useResult;
