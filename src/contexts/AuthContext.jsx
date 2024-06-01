import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// import "./Alert.scss";

// import gif from "./../assets/loader.gif";
// import RightSuccess from "./../assets/rightsuccess.jpg";
// import ErrorImage from "./../assets/errorImage.png";

import successAudio from "./../assets/successAudio.wav";
import errorAudio from "./../assets/errorAudio.mp3";

/* eslint-disable */
const AuthContext = createContext();

export const useAuthProvider = () => useContext(AuthContext);

const AuthController = ({ children }) => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(
    document.cookie.split("=")[1] !== "Logged Out"
  );
  const BASE_URL = "https://socialbeingbackend.onrender.com";

  useEffect(() => {
    async function getLoggedInUser() {
      try {
        const token = document.cookie.split("=")[1];

        if (!token) {
          setIsAuthenticated(false);
          return;
        }
        if (document.cookie.split("=")[1] === "Logged Out") {
          setIsAuthenticated(false);
          return;
        }

        const data = await axios({
          method: "GET",
          url: `${BASE_URL}/api/v1/users/loggedin/${token}`,
        });

        setUser(data?.data?.data?.user);
      } catch (err) {
        if (err !== undefined) {
          alert(err?.response?.data?.message);
        } else {
          alert("");
        }
      }
    }
    getLoggedInUser();
  }, []);

  const success = new Audio(`${successAudio}`);
  const error = new Audio(`${errorAudio}`);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        BASE_URL,
        posts,
        setPosts,
        success,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthController;
