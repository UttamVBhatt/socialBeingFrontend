/* eslint-disable */
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./HomeCenter.scss";
import axios from "axios";
import UserImage from "./../../assets/userImage.jpg";
import { capitalize } from "./../LeftNav/LeftNav";

import LogoImage from "./../../assets/logoImage.jpg";
import CreatePost from "../UpdateModel/CreatePost";
import { useAuthProvider } from "../../contexts/AuthContext";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function HomeCenter({ isOpen, onOpen }) {
  const { posts, setPosts, user, BASE_URL, success, error } = useAuthProvider();
  const [keyword, setKeyword] = useState("");
  const [again, setAgain] = useState(false);

  useEffect(() => {
    async function getAllPosts() {
      try {
        const data = await axios({
          method: "GET",
          url: `${BASE_URL}/api/v1/posts`,
        });

        setPosts(data?.data?.data?.posts);
      } catch (err) {
        if (err?.response?.data?.message !== undefined) {
          alert(err?.response?.data?.message);
        } else {
          alert("Error while fetching posts");
        }
        console.log(err);
        console.log(err?.response?.data?.message);
      }
    }
    getAllPosts();
  }, [again, setAgain]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (!keyword) return;

      const data = await axios({
        method: "GET",
        url: `${BASE_URL}/api/v1/posts/search?keyword=${keyword}`,
      });

      setPosts(data?.data?.data?.posts);
    } catch (err) {
      if (err?.response?.data?.message !== undefined) {
        alert(err?.response?.data?.message);
      } else {
        alert("Error while fetching posts");
      }
    }
  }

  useGSAP(
    () => {
      gsap.from(".logo-search-div", {
        y: 50,
        opacity: 0,
        duration: 0.8,
      });

      gsap.from("a", {
        opacity: 0,
        duration: 0.8,
        scale: 0,
      });
    },
    { scope: ".home-center" }
  );

  return (
    <div className="home-center">
      {isOpen && (
        <CreatePost
          onOpen={onOpen}
          isOpen={isOpen}
          setPosts={setPosts}
          success={success}
          error={error}
        />
      )}

      {/* ////// SEARCH DIV ///// */}

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
            onChange={(e) => setKeyword(e.target.value)}
            value={keyword || ""}
            type="search"
            placeholder="Search Posts Here......"
          />
          <i onClick={handleSubmit} className="fa-solid fa-search"></i>
        </form>
      </div>

      {posts?.length > 0 &&
        posts.map((post) => (
          <Post
            capitalize={capitalize}
            user={user}
            post={post}
            key={post._id}
          />
        ))}

      {keyword.length != 0 && posts.length <= 0 && (
        <p className="no-post-para">No Such Post found with that {keyword}.</p>
      )}
    </div>
  );
}

function Post({ post, capitalize, user }) {
  return (
    <Link to={`/post/${post?._id}`}>
      <div className="post-users-div">
        <img src={post?.user?.imageURL || UserImage} alt="User's Image" />

        <div>
          <p>{capitalize(post?.user?.name)}</p>
          <p>{post?.user?.email}</p>
        </div>
      </div>

      {post?.imageURL && (
        <img className="postImage" src={post?.imageURL} alt="post's image" />
      )}

      <p className="post-caption">{post?.caption}</p>

      <div className="likes-comments-container">
        <div>
          <i className="fa-regular fa-thumbs-up"></i>
          <p>Likes</p>
        </div>

        <div>
          <i className="fa-regular fa-comment-dots"></i>
          <p>Comments</p>
        </div>

        <div>
          <i className="fa-regular fa-bookmark"></i>
          <p>{user?.savedPosts?.includes(post?._id) ? "Saved" : "Save"}</p>
        </div>
      </div>

      <div className="add-comments-div">
        <input type="text" placeholder="Add Comments Here..." />
      </div>
    </Link>
  );
}

export default HomeCenter;
