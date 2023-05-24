import { useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import axios from "../api/axios";

const USERS_URL = "/user";
const useUsers = () => {
  const axiosPrivate = useAxiosPrivate();
  const [users, setUsers] = useState([]);

  const getAllUsers = () => {
    axiosPrivate
      .get(USERS_URL)
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  };

  const createNewUser = async (user) => {
    await axios
      .post(USERS_URL, user, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => {
        getAllUsers();
        return res.data;
      })
      .catch((error) => {
        throw error;
      });
  };

  const updateUser = (user) => {
    console.log(user);
    axiosPrivate
      .patch(USERS_URL, user)
      .then((res) => {
        getAllUsers();
        return res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteUser = async (id) => {
    axiosPrivate
      .delete(USERS_URL, { data: id })
      .then((res) => {
        getAllUsers();
        return res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return {
    users,
    createNewUser,
    deleteUser,
    updateUser,
  };
};

export default useUsers;
