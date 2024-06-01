import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthProvider } from "../../contexts/AuthContext";

import logoImage from "./../../assets/logoImage.jpg";

function Login() {
  const [email, setEmail] = useState("");
  const { BASE_URL } = useAuthProvider();
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const data = await axios({
        method: "POST",
        url: `${BASE_URL}/api/v1/users/forgot/password`,
        data: { email },
      });

      alert(data?.data?.message);

      navigate("/");
    } catch (err) {
      if (err?.response?.data?.message !== undefined) {
        alert(err?.response?.data?.message);
      } else {
        alert("Error while sendin email, please try again later");
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
          <h2>Forgot Password</h2>
          <div>
            <input
              type="email"
              placeholder="Enter Your Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="desc-div">
            <p className="description">
              Write your working email, you will receive a reset password link
              on your given email just follow it, write your new password,
              confirm it and finally reset your password.
            </p>
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
