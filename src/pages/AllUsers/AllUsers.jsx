/* eslint-disable */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuthProvider } from "./../../contexts/AuthContext";

import userImage from "./../../assets/userImage.jpg";
import LogoImage from "./../../assets/logoImage.jpg";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import "./AllUsers.scss";

function AllUsers() {
  const { BASE_URL, user } = useAuthProvider();
  const [users, setUsers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [again, setAgain] = useState(false);

  useEffect(() => {
    async function getAllUsers() {
      try {
        const data = await axios({
          method: "GET",
          url: `${BASE_URL}/api/v1/users?limit=20`,
        });

        setUsers(data?.data?.data?.users);
      } catch (err) {
        if (err?.response?.data?.message !== undefined) {
          alert(err?.response?.data?.message);
        } else {
          alert("Error while getting all users");
        }
      }
    }
    getAllUsers();
  }, [BASE_URL, again, setAgain]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (!keyword) return;

      const data = await axios({
        method: "GET",
        url: `${BASE_URL}/api/v1/users/search?keyword=${keyword.toLowerCase()}`,
      });

      setUsers(data?.data?.data?.users);
    } catch (err) {
      if (err?.response?.data?.message !== undefined) {
        alert(err?.response?.data?.message);
      } else {
        alert("Error while searching user");
      }
    }
  }

  useGSAP(
    () => {
      gsap.from(".logo-search-div", {
        y: -100,
        opacity: 0,
        duration: 0.5,
      });

      gsap.from(".users-container", {
        y: 100,
        duration: 1,
        delay: 0.4,
        opacity: 0,
      });
    },
    { scope: ".all-users-container" }
  );

  return (
    <div className="all-users-container">
      <div className="logo-search-div">
        <img
          onClick={() => {
            setAgain(!again);
            setKeyword(() => "");
          }}
          src={LogoImage}
          alt="Logo Image"
        />

        <form onSubmit={handleSubmit}>
          <input
            type="search"
            onChange={(e) => setKeyword(e.target.value)}
            value={keyword || ""}
            placeholder="Search Users Here....."
          />
          <i onClick={handleSubmit} className="fa-solid fa-search"></i>
        </form>
      </div>

      <div className="users-container">
        {keyword.length !== 0 && users?.length <= 0 && (
          <p className="no-user-para">
            No such user found with {keyword || "that name"}.
          </p>
        )}

        {users[0]?._id === user?._id && (
          <p className="no-user-para">
            No such user found with {keyword || "that name"}.
          </p>
        )}

        {users?.map((oneUser) => (
          <User user={user} oneUser={oneUser} key={oneUser._id} />
        ))}
      </div>
    </div>
  );
}

function User({ oneUser, user }) {
  if (oneUser._id === user._id) return;

  return (
    <Link to={`/${oneUser._id}`}>
      <div>
        <div className="data-container">
          <img src={oneUser?.imageURL || userImage} alt={oneUser?.name} />

          <div>
            <p>{oneUser?.name}</p>
            <p>{oneUser?.email}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default AllUsers;
