import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthProvider } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

import "./Login.scss";

import logoImage from "./../../assets/logoImage.jpg";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function Login() {
  const [isText, setIsText] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { BASE_URL, setIsAuthenticated, setUser, success, error } =
    useAuthProvider();
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    const loading = toast.loading("Logging in please wait....");

    try {
      const data = await axios({
        method: "POST",
        url: `${BASE_URL}/api/v1/users/login`,
        data: { email, password },
      });

      setUser(data?.data?.data?.user);
      setIsAuthenticated(true);

      document.cookie = `jwt=${data?.data?.data?.token}`;

      success.play();

      toast.update(loading, {
        render: "Logged In Successfully",
        type: "success",
        isLoading: false,
        autoClose: 2500,
      });

      navigate("/");
    } catch (err) {
      if (err?.response?.data?.message !== undefined) {
        error.play();

        // toast.error(err?.response?.data?.message);
        toast.update(loading, {
          render: err?.response?.data?.message,
          type: "error",
          isLoading: false,
          autoClose: 2500,
        });
      } else {
        error.play();

        toast.update(loading, {
          render: "Error while logging in!!!",
          type: "error",
          isLoading: false,
          autoClose: 2500,
        });
      }
      navigate("/");
      console.log(err);
      console.log(err?.response?.data?.message);
    }
  }

  useGSAP(
    () => {
      gsap.from(".logo-name-container-div", {
        y: -100,
        opacity: 0,
        duration: 1,
      });

      gsap.from("form", {
        y: 100,
        opacity: 0,
        duration: 1,
      });
    },
    { scope: ".login-page" }
  );

  return (
    <div className="login-page">
      <div className="logo-name-container-div">
        <img src={logoImage} alt="Logo Image" />
        <div>
          <p className="webapp-name">Social Being</p>
          <p>Explore the ideas througout the world</p>
        </div>
      </div>

      <form onSubmit={handleLogin}>
        <div>
          <h2>Login</h2>
          <div>
            <input
              type="email"
              placeholder="Enter Your Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <input
              type={isText ? "text" : "password"}
              placeholder="password"
              required
              minLength={8}
              onChange={(e) => setPassword(e.target.value)}
            />

            {isText ? (
              <i
                className="fa-solid fa-eye"
                onClick={() => setIsText(!isText)}
              ></i>
            ) : (
              <i
                className="fa-solid fa-eye-slash"
                onClick={() => setIsText(!isText)}
              ></i>
            )}
          </div>

          <p className="forgot-password">
            Forgot your password ?{" "}
            <Link to="/forgot/password">Click Here...</Link>
          </p>

          <p className="createAccount">
            Dont have an account <Link to="/register">Create New Account</Link>
          </p>

          <button type="submit">LogIn</button>
        </div>
      </form>

      <div className="right-blue-span"></div>
      <div className="left-blue-span"></div>
    </div>
  );
}

export default Login;
