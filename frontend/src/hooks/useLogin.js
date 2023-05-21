import axios from "../api/axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
const LOGIN_URL = "/user/login";

const useLogin = () => {
  const { setAuth, persist, setPersist } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (username, password) => {
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ username, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      const fullname = response?.data?.fullname;
      setAuth({ username, password, fullname, roles, accessToken });
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        throw "No Server Response";
      } else if (err.response?.status === 400) {
        throw "Username o contraseña incorrectos";
      } else if (err.response?.status === 401) {
        throw "Username o contraseña incorrectos";
      } else {
        throw "Login Failed";
      }
    }
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  return { handleLogin, togglePersist };
};

export default useLogin;
