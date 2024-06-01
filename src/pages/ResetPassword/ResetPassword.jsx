import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuthProvider } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

import logoImage from "./../../assets/logoImage.jpg";

function Login() {
  const [isText, setIsText] = useState(false);
  const [isConText, setIsConText] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const { BASE_URL, setUser, setIsAuthenticated, success, error } =
    useAuthProvider();
  const { token } = useParams();

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    const loading = toast.loading("Reseting your password, please wait...");

    try {
      if (!token) return;

      const data = await axios({
        method: "POST",
        url: `${BASE_URL}/api/v1/users/reset/password/${token}`,
        data: { password, passwordConfirm },
      });

      success.play();

      setUser(data?.data?.data?.user);
      setIsAuthenticated(true);

      document.cookie = `jwt=${data?.data?.data?.token}`;

      toast.update(loading, {
        render: "Password Updated Successfylly",
        type: "success",
        isLoading: false,
        autoClose: 1400,
      });

      navigate("/");
    } catch (err) {
      if (err?.response?.data?.message !== undefined) {
        error.play();

        toast.update(loading, {
          render: err?.response?.data?.message,
          type: "success",
          isLoading: false,
          autoClose: 1400,
        });
      } else {
        error.play();

        toast.update(loading, {
          render: "Error while updating password, please try again later",
          type: "success",
          isLoading: false,
          autoClose: 1400,
        });
      }
      navigate("/");
      console.log(err);
      console.log(err?.response?.data?.message);
    }
  }

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
          <h2>Reset Password</h2>

          <div>
            <input
              type={isText ? "text" : "password"}
              placeholder="Password"
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

          <div>
            <input
              type={isConText ? "text" : "password"}
              placeholder="Confirm Your Password"
              required
              minLength={8}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />

            {isConText ? (
              <i
                className="fa-solid fa-eye"
                onClick={() => setIsConText(!isConText)}
              ></i>
            ) : (
              <i
                className="fa-solid fa-eye-slash"
                onClick={() => setIsConText(!isConText)}
              ></i>
            )}
          </div>

          <button type="submit">Submit</button>
        </div>
      </form>

      <div className="right-blue-span"></div>
      <span className="left-blue-span"></span>
    </div>
  );
}

export default Login;
