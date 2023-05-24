import { useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import axios from "../api/axios";
const COMMENT_URL = "/comment";

const useComments = () => {
  const axiosPrivate = useAxiosPrivate();
  const [comment, setComment] = useState([]);
  const getAllComments = () => {
    axios
      .get(`${COMMENT_URL}/get-comment`)
      .then((res) => setComment(res.data))
      .catch((err) => console.log(err));
  };
  const insertComment = async (comment) => {
    return axiosPrivate
      .post(`${COMMENT_URL}/add-comment`, comment)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        return error;
      });
  };
  useEffect(() => {
    getAllComments();
  }, []);
  return {
    comment,
    insertComment,
    getAllComments
  };
};

export default useComments;
