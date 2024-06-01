/* eslint-disable */

import { useEffect, useState } from "react";
import { capitalize } from "../LeftNav/LeftNav";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthProvider } from "../../contexts/AuthContext";
import UserImage from "./../../assets/userImage.jpg";
import { toast } from "react-toastify";

// import "./OnePost.scss";

import { useDispatch, useSelector } from "react-redux";

import userImage from "./../../assets/userImage.jpg";
import AllCommentsDiv from "../AllCommentsDiv/AllCommentsDiv";
import NoCommentsDiv from "../NoCommentsDiv/NoCommentsDiv";
import LikesCommentsContainer from "../LikesCommentsContainer/LikesCommentsContainer";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function OneReel() {
  let { id } = useParams();
  const { BASE_URL, user, setUser, success, error } = useAuthProvider();
  const [comment, setComment] = useState("");

  const { post, comments, isVisible, likes } = useSelector(
    (state) => state.OneReelReducer
  );

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    async function getOnePost() {
      try {
        const data = await axios({
          method: "GET",
          url: `${BASE_URL}/api/v1/video/posts/${id}`,
        });

        dispatch({ type: "setPost", payload: data?.data?.data?.post });

        dispatch({ type: "setComments", payload: data?.data?.data?.comments });

        dispatch({
          type: "setLikes",
          payload: data?.data?.data?.likes?.length,
        });
      } catch (err) {
        if (err?.response?.data?.message !== undefined) {
          alert(err?.response?.data?.message);
        } else {
          alert("Error while fetching post");
        }
      }
    }
    getOnePost();
  }, [id, BASE_URL, dispatch, post?._id, user?._id, user?.savedPosts]);

  async function handleAddComment(e) {
    e.preventDefault();

    dispatch({
      type: "addComment",
      payload: { post: post._id, user, comment },
    });

    setComment(() => "");

    try {
      const data = await axios({
        method: "POST",
        url: `${BASE_URL}/api/v1/comments`,
        data: {
          post: post?._id,
          user: user?._id,
          comment,
        },
      });
    } catch (err) {
      if (err?.response?.data?.message !== undefined) {
        alert(err?.response?.data?.message);
      } else {
        alert("Error while adding your comment, please try again later!!!");
      }
      console.log(err);
    }
  }

  async function handleSavedPost() {
    const loading = toast.loading("Updating......");

    try {
      const data = await axios({
        method: "POST",
        url: `${BASE_URL}/api/v1/video/posts/${post._id}/${user._id}`,
      });

      success.play();

      toast.update(loading, {
        render: data?.data?.message,
        type: "success",
        isLoading: false,
        autoClose: 1400,
      });

      setUser(data?.data?.user);
    } catch (err) {
      if (err?.response?.data?.message !== undefined) {
        error.play();

        toast.update(loading, {
          render: err?.response?.data?.message,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      } else {
        error.play();

        toast.update(loading, {
          render: "Error While Saving This Post",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    }
  }

  async function deleteComment(obj) {
    const index = comments.indexOf(obj);

    dispatch({ type: "deleteComment", payload: { index } });

    dispatch({ type: "showDelete" });

    const loading = toast.loading("Deleting Comment....");

    try {
      const data = await axios({
        method: "DELETE",
        url: `${BASE_URL}/api/v1/comments/${obj._id}`,
      });

      success.play();

      toast.update(loading, {
        render: "Comment Deleted",
        type: "success",
        isLoading: false,
        autoClose: 1500,
      });
    } catch (err) {
      if (err?.response?.data?.message !== undefined) {
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
          render: "Error while deleting comment",
          type: "error",
          isLoading: false,
          autoClose: 2500,
        });
      }
      console.log(err);
    }
  }

  async function unlikePost() {
    const loading = toast.loading("Unliking the post....");

    try {
      const data = await axios({
        method: "DELETE",
        url: `${BASE_URL}/api/v1/likes`,
        data: {
          post: post?._id,
          user: user?._id,
        },
      });

      success.play();

      setUser(data?.data?.user);

      dispatch({ type: "unlikePost" });

      toast.update(loading, {
        render: "Post Unliked",
        type: "success",
        isLoading: false,
        autoClose: 1500,
      });

      navigate(`/reels/${id}`);
    } catch (err) {
      if (err?.response?.data?.message !== undefined) {
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
          render: "Error while unliking the post, please try again later!!!",
          type: "success",
          isLoading: false,
          autoClose: 2500,
        });
      }
    }
  }

  async function likePost() {
    const loading = toast.loading("Liking this post...");

    try {
      const data = await axios({
        method: "POST",
        url: `${BASE_URL}/api/v1/likes`,
        data: {
          post: post?._id,
          user: user?._id,
        },
      });

      setUser(data?.data?.user);

      success.play();

      dispatch({ type: "likePost" });

      toast.update(loading, {
        render: "Post Liked...",
        type: "success",
        isLoading: false,
        autoClose: 1400,
      });
    } catch (err) {
      if (err?.response?.data?.message !== undefined) {
        error.play();

        toast.update(loading, {
          render: err?.response?.data?.message,
          type: "error",
          isLoading: false,
          autoClose: 2300,
        });
      } else {
        error.play();

        toast.update(loading, {
          render: "Error while liking the post, please try again later!!!",
          type: "error",
          isLoading: false,
          autoClose: 2300,
        });
      }
    }
  }

  useGSAP(
    () => {
      gsap.from(".a", {
        y: 200,
        duration: 1,
      });

      gsap.from(".a .post-users-div", {
        y: -50,
        duration: 1,
        delay: 0.5,
        opacity: 0,
      });

      gsap.from(".a img", {
        y: 50,
        duration: 1,
        delay: 0.5,
        opacity: 0,
      });

      gsap.from(".a .post-caption, .a .likes-comments-container", {
        y: -30,
        duration: 1,
        delay: 0.7,
        opacity: 0,
      });

      gsap.from(".a form", {
        y: 80,
        duration: 1,
        delay: 0.7,
        opacity: 0,
      });

      gsap.from(".a .all-comments-div", {
        duration: 1,
        delay: 0.7,
        opacity: 0,
      });
    },
    { scope: ".one-post" }
  );

  return (
    <div className="one-post" onClick={() => dispatch({ type: "hideDelBtn" })}>
      <div className="a">
        <div className="post-users-div">
          <Link to={`/${post?.user?._id}`}>
            <img src={post?.user?.imageURL || UserImage} alt="User's Image" />

            <div>
              <p>{capitalize(post?.user?.name)}</p>
              <p>{post?.user?.email}</p>
            </div>
          </Link>
        </div>

        {post?.videoURL && (
          <video
            src={post?.videoURL}
            autoPlay
            loop
            controls
            controlsList="nodownload"
            className="postImage"
          ></video>
        )}

        <p className="post-caption">{post?.caption}</p>

        <div className="likes-comments-container">
          <LikesCommentsContainer
            user={user}
            likes={likes}
            post={post}
            comments={comments}
            unlikePost={unlikePost}
            handleSavedPost={handleSavedPost}
            likePost={likePost}
          />
        </div>

        <form onSubmit={handleAddComment} className="add-comments-div">
          <input
            onChange={(e) => setComment(e.target.value)}
            type="text"
            placeholder="Add Comments Here..."
            value={comment || ""}
          />
        </form>

        {/* ////// Comments-div ///// */}

        <div className="all-comments-div">
          {comments.length > 0 ? (
            <AllCommentsDiv
              user={user}
              comments={comments}
              dispatch={dispatch}
              isVisible={isVisible}
              deleteComment={deleteComment}
              post={post}
              userImage={userImage}
            />
          ) : (
            <NoCommentsDiv />
          )}
        </div>
      </div>
    </div>
  );
}

export default OneReel;
