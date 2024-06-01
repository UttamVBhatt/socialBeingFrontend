import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthProvider } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";
import "./Register.scss";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function Register() {
  const [isText, setIsText] = useState(false);
  const [conIsText, setConIsText] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const { BASE_URL, setIsAuthenticated, setUser, success, error } =
    useAuthProvider();
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();

    const loading = toast.loading("Creating account please wait...");

    try {
      const data = await axios({
        method: "POST",
        url: `${BASE_URL}/api/v1/users/signup`,
        data: { name, email, city, description, password, passwordConfirm },
      });

      success.play();

      console.log(data?.data?.data);
      document.cookie = `jwt=${data?.data?.data?.token}`;

      setUser(data?.data?.data?.user);
      setIsAuthenticated(true);

      toast.update(loading, {
        render: "Account Created Successfully",
        type: "success",
        isLoading: false,
        autoClose: 1400,
      });

      navigate("/");
    } catch (err) {
      if (err !== undefined) {
        error.play();

        toast.update(loading, {
          render: err?.response?.data?.message,
          type: "error",
          isLoading: false,
          autoClose: 2500,
        });
      } else {
        error.play();

        toast.update(loading, {
          render: "Error while creating account, please try again later",
          type: "error",
          isLoading: false,
          autoClose: 2500,
        });
      }
      navigate("/register");
      console.log(err);
      console.log(err?.response?.data?.message);
    }
  }

  useGSAP(
    () => {
      gsap.from("form", {
        opacity: 0,
        duration: 0.5,
      });

      gsap.from("form div:nth-child(odd)", {
        x: -100,
        opacity: 0,
        stagger: 0.5,
      });

      gsap.from("form div:nth-child(even)", {
        x: 100,
        opacity: 0,
        stagger: 0.5,
      });

      gsap.from("form h2", {
        scale: 0,
        opacity: 0,
        duration: 0.3,
      });

      gsap.from("form button", {
        y: 100,
        opacity: 0,
        duration: 0.3,
      });
    },
    { scope: ".register-page" }
  );

  return (
    <div className="register-page">
      <form onSubmit={handleRegister}>
        <h2>Create Account</h2>
        <div>
          <input
            type="text"
            placeholder="Write Your Name"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <input
            type="email"
            placeholder="Write Your Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Your City Name"
            required
            minLength={3}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Description About You"
            required
            minLength={3}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <input
            type={isText ? "text" : "password"}
            placeholder="Write Your Password"
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
            type={conIsText ? "text" : "password"}
            placeholder="Confirm Your Password"
            required
            minLength={8}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          {conIsText ? (
            <i
              className="fa-solid fa-eye"
              onClick={() => setConIsText(!conIsText)}
            ></i>
          ) : (
            <i
              className="fa-solid fa-eye-slash"
              onClick={() => setConIsText(!conIsText)}
            ></i>
          )}
        </div>

        <button type="submit">Create Account</button>
      </form>

      <div className="right-blue-span"></div>
      <span className="left-blue-span"></span>
    </div>
  );
}

export default Register;
