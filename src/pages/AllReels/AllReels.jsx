/* eslint-disable */

import { useEffect, useState } from "react";
import { capitalize } from "../../components/LeftNav/LeftNav";
import axios from "axios";
import { useAuthProvider } from "../../contexts/AuthContext";

import "./AllReels.scss";

import { useDispatch, useSelector } from "react-redux";

import userImage from "./../../assets/userImage.jpg";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function AllReels() {
  const { BASE_URL, user } = useAuthProvider();

  const { reels } = useSelector((state) => state.OneReelReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    async function getAllReels() {
      try {
        const data = await axios({
          method: "GET",
          url: `${BASE_URL}/api/v1/video/posts`,
        });

        dispatch({ type: "setReels", payload: data?.data?.data?.posts });
      } catch (err) {
        if (err?.response?.data?.message !== undefined) {
          alert(err?.response?.data?.message);
        } else {
          alert("Error while fetching all reels!!!");
        }
      }
    }
    getAllReels();
  }, [BASE_URL, dispatch]);

  useGSAP(
    () => {
      gsap.from("div:nth-child(odd)", {
        x: -100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
      });

      gsap.from("div:nth-child(even)", {
        x: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
      });

      gsap.from(".likes-comments-container", {
        y: 100,
        opacity: 1,
        duration: 1,
      });

      gsap.from(".post-caption", {
        y: 70,
        duration: 1,
        opacity: 0,
      });
    },
    { scope: ".reel-container" }
  );

  return (
    <div className="home-center">
      <div className="reel-container">
        {reels?.map((reel) => (
          <Reel
            key={reel?._id}
            userImage={userImage}
            reel={reel}
            user={user}
            dispatch={dispatch}
            BASE_URL={BASE_URL}
          />
        ))}
      </div>
    </div>
  );
}

function Reel({ reel, userImage, user, BASE_URL }) {
  const [post, setPost] = useState({});
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function getPost() {
      try {
        const data = await axios({
          method: "GET",
          url: `${BASE_URL}/api/v1/video/posts/${reel?._id}`,
        });

        setPost(data?.data?.data?.post);
        setComments(data?.data?.data?.comments);
        setLikes(data?.data?.data?.likes);
      } catch (err) {
        console.log(err);
      }
    }
    getPost();
  }, [BASE_URL]);

  return (
    <div>
      <Link to={`/${reel?.user?._id}`} className="post-users-div">
        <img src={reel?.user?.imageURL || userImage} alt="User's Image" />

        <div>
          <p>{capitalize(reel?.user?.name)}</p>
          <p>{reel?.user?.email}</p>
        </div>
      </Link>

      {reel?.videoURL && (
        <video
          src={reel?.videoURL}
          autoPlay
          loop
          controls
          controlsList="nodownload"
          className="postImage"
        ></video>
      )}

      <p className="post-caption">{reel?.caption}</p>

      <div className="likes-comments-container">
        <div>
          <Link to={`/reels/${reel?._id}`}>
            <i className="fa-regular fa-thumbs-up"></i>
            <p
              onClick={
                user?.likedPosts?.length > 0 &&
                user?.likedPosts?.includes(reel?._id)
                  ? () => unlikePost(reel)
                  : () => likePost(reel)
              }
            >
              {likes?.length || 0}{" "}
              {user?.likedPosts?.includes(reel?._id) ? "Liked" : "Likes"}
            </p>
          </Link>
        </div>

        <div>
          <Link to={`/reels/${reel?._id}`}>
            <i className="fa-regular fa-comment-dots"></i>
            <p>{comments?.length || 0} Comments</p>
          </Link>
        </div>

        <div>
          <Link to={`/reels/${reel?._id}`}>
            <i className="fa-regular fa-bookmark"></i>
            <p>{user?.savedVideos?.includes(reel?._id) ? "Saved" : "Save"}</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AllReels;
