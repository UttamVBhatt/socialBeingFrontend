/* eslint-disable */
import axios from "axios";
import { Link, useParams } from "react-router-dom";

import "./LeftNav.scss";

import backCoverImage from "./../../assets/backCoverImageTwo.jpg";
import UserImage from "./../../assets/userImage.jpg";
import { useEffect, useState } from "react";
import UpdateData from "../UpdateData/UpdateData";
import { useAuthProvider } from "../../contexts/AuthContext";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export const capitalize = (name) =>
  name?.split("")[0].toUpperCase() + name?.slice(1);

function LeftNav({ onLogOut }) {
  const [users, setUsers] = useState([]);
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser, BASE_URL } = useAuthProvider();

  useEffect(() => {
    async function getAllUsers() {
      try {
        const data = await axios({
          method: "GET",
          url: `${BASE_URL}/api/v1/users?limit=${3}`,
        });

        setUsers(data?.data?.data?.users);
      } catch (err) {
        if (!err?.response?.data?.message) {
          alert("Error while getting all the  users");
        } else {
          alert(err?.response?.data?.message);
        }
        console.log(err);
        console.log(err?.response?.data?.message);
      }
    }
    getAllUsers();
  }, []);

  useGSAP(
    () => {
      gsap.from(".profile-card-left-nav", {
        x: -200,
        opacity: 0,
        duration: 1,
        delay: 0.3,
      });

      gsap.from("h3, .all-users-div, a", {
        opacity: 0,
        y: 100,
        duration: 1,
        delay: 0.3,
      });
    },
    { scope: ".left-nav" }
  );

  return (
    <div className="left-nav">
      {/* ////// PROFILE DIV ////// */}

      <>
        {!id ? (
          <div className="profile-card-left-nav">
            <img
              src={user?.backCoverImage || backCoverImage}
              alt="user image"
            />

            <div className="user-image-div">
              <img
                src={user?.imageURL || UserImage}
                alt="user's image"
                className="user-image-card-leftNav"
              />
            </div>

            <div className="user-name-description-div">
              <p>{capitalize(user?.name) || "User"}</p>
              <p>{user?.description || "Write about yourself"}</p>
            </div>

            <div className="user-follower-following-div">
              <p className="border-top"></p>

              <div className="user-follow-data">
                <div className="followers">
                  <p>{user?.followers?.length || 0}</p>
                  <p>Followers</p>
                </div>

                <p className="border-center"></p>

                <div className="following">
                  <p>{user?.following?.length || 0}</p>
                  <p>Following</p>
                </div>
              </div>

              <p className="border-bottom"></p>
            </div>

            <div className="my-profile-div">
              <Link to={`/me/${user?._id}`}>My Profile</Link>
            </div>
          </div>
        ) : (
          <div className="about-me-logout">
            <div className="profile-info-pen-div">
              <p>Profile Info</p>
              <i
                onClick={() => setIsOpen(true)}
                className="fa-solid fa-pen-fancy"
              ></i>
            </div>

            <div className="user-profile-desc-div">
              <p>
                Name :-
                <span>{capitalize(user?.name)}</span>
              </p>
              <p>
                Lives in :-
                <span>{user?.city || "City"}</span>
              </p>
              <p>
                About Me :-
                <span>{user?.description || "About Me"}</span>
              </p>
              <p>
                Email :-
                <span>{user?.email || "user@exapmple.com"}</span>
              </p>
            </div>

            <div className="logout-btn-div">
              <button onClick={onLogOut}>LogOut</button>
            </div>
          </div>
        )}
      </>

      <UpdateData
        user={user}
        BASE_URL={BASE_URL}
        setUser={setUser}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      {/* ////// SUGGESTION DIV /////// */}

      <h3>People who you may know</h3>

      <div className="all-users-div">
        {users.length > 0 &&
          users?.map((user) => (
            <User capitalize={capitalize} user={user} key={user._id} />
          ))}
      </div>

      <Link to={`${user?._id}/all/users`}>More</Link>
    </div>
  );
}

function User({ user, capitalize }) {
  return (
    <div>
      <Link to={`/${user?._id}`}>
        <img src={user?.imageURL || UserImage} alt="User's Image" />

        <div>
          <p>{capitalize(user?.name)}</p>
          <p>{user?.email}</p>
        </div>
      </Link>
    </div>
  );
}

export default LeftNav;
