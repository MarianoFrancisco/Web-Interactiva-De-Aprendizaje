import { useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
const Medal_URL = "/medal";

const useMedals = () => {
  const axiosPrivate = useAxiosPrivate();
  const [medal, setMedal] = useState([]);
  const getAllMedals = () => {
    axiosPrivate
      .get(`${Medal_URL}/get-medals`)
      .then((res) => setMedal(res.data))
      .catch((err) => console.log(err));
  };
  const insertMedal = async (medal) => {
    return axiosPrivate
      .post(`${Medal_URL}/add-medal`, medal)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        return error;
      });
  };
  useEffect(() => {
    getAllMedals();
  }, []);
  return {
    medal,
    insertMedal,
    getAllMedals
  };
};

export default useMedals;
