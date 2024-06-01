/* eslint-disable */

import { useEffect, useState, useReducer } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { useAuthProvider } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

import "./OneUser.scss";

import OneUserPosts from "../../components/OneUserPosts/OneUserPosts";
import OneUserFollower from "../../components/OneUserFollower/OneUserFollower";
import OneUserFollowing from "../../components/OneUserFollowing/OneUserFollowing";
import FollowUnFollowDiv from "../../components/FollowUnFollow/FollowUnFollowDiv";
import OneUserLikesCommentsContainer from "../../components/OneUserLikesCommentsContainer/OneUserLikesCommentsContainer";
import OneUserDivOutlet from "../../components/OneUserDivOutlet/OneUserDivOutlet";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const initialState = {
  isPost: false,
  isFollow: false,
  isFollowing: false,
  isSwipe: true,
  isArrow: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "setIsPost":
      return { ...initialState, isPost: !state.isPost, isSwipe: false };

    case "setIsFollowers":
      return { ...initialState, isFollow: !state.isFollow, isSwipe: false };

    case "setIsFollowing":
      return {
        ...initialState,
        isFollowing: !state.isFollowing,
        isSwipe: false,
      };

    case "setIsArrow":
      return { ...initialState, isArrow: !state.isArrow, isSwipe: false };
  }
}

function MyProfile() {
  const { BASE_URL, user, setUser, success, error } = useAuthProvider();
  const [{ isPost, isFollow, isFollowing, isSwipe, isArrow }, dispatch] =
    useReducer(reducer, initialState);

  const [oneUser, setOneUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    async function getUser() {
      try {
        const data = await axios({
          method: "GET",
          url: `${BASE_URL}/api/v1/users/${id}`,
        });

        if (data?.data?.data?.user?._id === user._id)
          navigate(`/me/${user._id}`);

        setOneUser(data?.data?.data?.user);

        setPosts(data?.data?.data?.user?.posts);

        setFollowers(data?.data?.data?.user?.followers);

        setFollowings(data?.data?.data?.user?.following);
      } catch (err) {
        if (err?.response?.data?.message !== undefined) {
          alert(err?.response?.data?.message);
        } else {
          alert("Error while fetching user's details");
        }
      }
    }
    getUser();
  }, [id, BASE_URL, user._id, navigate]);

  async function getUpdatedUser() {
    try {
      const data = await axios({
        method: "GET",
        url: `${BASE_URL}/api/v1/users/${id}`,
      });

      if (data?.data?.data?.user?._id === user._id) navigate(`/me/${user._id}`);

      setOneUser(data?.data?.data?.user);

      setPosts(data?.data?.data?.user?.posts);

      setFollowers(data?.data?.data?.user?.followers);

      setFollowings(data?.data?.data?.user?.following);
    } catch (err) {
      if (err?.response?.data?.message !== undefined) {
        alert(err?.response?.data?.message);
      } else {
        alert("Error while fetching user's details");
      }
    }
  }

  async function handleUnfollow(id) {
    const loading = toast.loading(`Unfollowing ${oneUser?.name}....`);

    try {
      if (!id) return;

      const data = await axios({
        method: "DELETE",
        url: `${BASE_URL}/api/v1/followuser/unfollow/${user._id}/${id}`,
      });

      success.play();

      toast.update(loading, {
        render: data?.data?.message,
        type: "success",
        isLoading: false,
        autoClose: 1400,
      });

      setUser(data?.data?.user);
      setOneUser(data?.data?.userToUnfollow);

      getUpdatedUser();
    } catch (err) {
      if (err?.response?.data?.message !== undefined) {
        error.play();

        toast.update(loading, {
          render: err?.response?.data?.message,
          type: "error",
          isLoading: false,
          autoClose: 1400,
        });
      } else {
        error.play();

        toast.update(loading, {
          render: "Error while unfollowing user",
          type: "error",
          isLoading: false,
          autoClose: 1400,
        });
      }
    }
  }

  async function handleFollow(id) {
    const loading = toast.loading(`Following ${oneUser?.name}....`);

    try {
      if (!id) return;

      const data = await axios({
        method: "POST",
        url: `${BASE_URL}/api/v1/followuser/follow`,
        data: {
          follower: `${user._id}`,
          following: `${id}`,
        },
      });

      success.play();

      toast.update(loading, {
        render: data?.data?.message,
        type: "success",
        isLoading: false,
        autoClose: 1400,
      });

      setUser(data?.data?.user);
      setOneUser(data?.data?.userToFollow);

      getUpdatedUser();
    } catch (err) {
      if (err?.response?.data?.message !== undefined) {
        error.play();

        toast.update(loading, {
          render: err?.response?.data?.message,
          type: "error",
          isLoading: false,
          autoClose: 1400,
        });
      } else {
        error.play();

        toast.update(loading, {
          render: "Error while following user",
          type: "error",
          isLoading: false,
          autoClose: 1400,
        });
      }
    }
  }

  useGSAP(
    () => {
      gsap.from("img", {
        opacity: 0,
        duration: 0.5,
      });

      gsap.from(".user-image-div-outlet", {
        y: -50,
        opacity: 0,
        duration: 0.7,
        delay: 0.1,
      });

      gsap.from(".user-name-description-div-outlet", {
        y: 50,
        opacity: 0,
        duration: 0.7,
        delay: 0.1,
      });

      gsap.from(".user-follower-following-div-outlet .border-top-outlet", {
        x: -100,
        opacity: 0,
        duration: 1,
        delay: 0.2,
      });

      gsap.from(".user-follower-following-div-outlet .border-bottom-outlet", {
        x: 100,
        opacity: 0,
        duration: 1,
        delay: 0.2,
      });

      gsap.from(
        ".user-follower-following-div-outlet .user-follow-data-outlet .followers-outlet, .user-follower-following-div-outlet .user-follow-data-outlet .following-outlet",
        {
          y: -50,
          opacity: 0,
          stagger: 0.3,
          delay: 0.5,
        }
      );

      gsap.from(
        ".user-follower-following-div-outlet .user-follow-data-outlet .border-center-outlet",
        {
          y: -50,
          opacity: 0,
          stagger: 0.3,
          delay: 0.5,
        }
      );

      gsap.from(".my-profile-div-outlet .features-div div", {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        delay: 0.3,
      });

      gsap.from(".caption-post-div", {
        y: 100,
        opacity: 0,
        delay: 0.3,
      });
    },
    { scope: ".my-profile .profile-card-left-nav-outlet" }
  );

  return (
    <div className="my-profile">
      {/* ////// PROFILE DIV ////// */}

      <div className="profile-card-left-nav-outlet">
        <OneUserLikesCommentsContainer oneUser={oneUser} isSwipe={isSwipe} />

        <OneUserDivOutlet dispatch={dispatch} isArrow={isArrow} />

        {isArrow && (
          <FollowUnFollowDiv
            onUnFollow={handleUnfollow}
            onFollow={handleFollow}
            user={user}
            oneUser={oneUser}
          />
        )}

        {isPost && posts.length > 0 && (
          <OneUserPosts oneUser={oneUser} posts={posts} />
        )}

        {isPost && posts?.length <= 0 && (
          <p className="no-post-para">
            {oneUser?.name} do not have any post yet
          </p>
        )}

        {isFollow && followers?.length <= 0 && (
          <p className="no-post-para">
            {oneUser?.name} do not have any follower yet
          </p>
        )}

        {isFollow && followers?.length > 0 && (
          <div className="all-followers-div">
            {followers?.map((follower) => (
              <OneUserFollower
                user={user}
                id={id}
                key={follower._id}
                follower={follower}
              />
            ))}
          </div>
        )}

        {isFollowing && followings?.length <= 0 && (
          <p className="no-post-para">
            {oneUser?.name} do not follow anybody yet
          </p>
        )}

        {isFollowing && followings?.length > 0 && (
          <div className="all-followers-div">
            {followings?.map((following) => (
              <OneUserFollowing
                id={id}
                key={following._id}
                following={following}
                user={user}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyProfile;
