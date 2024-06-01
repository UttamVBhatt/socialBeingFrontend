import { useEffect, useState, useReducer } from "react";

import "./MyProfile.scss";
import { useAuthProvider } from "../../contexts/AuthContext";

import MyProfileDivOutlet from "../MyProfileDivOutlet/MyProfileDivOutlet";
import UploadImage from "../UploadImage/UploadImage";
import UploadCoverImage from "../UploadCoverImg/UploadCoverImg";
import axios from "axios";
import AllPosts from "../AllPosts/AllPosts";
import UpdateData from "../UpdateData/UpdateData";
import AllFollowers from "../AllFollowers/AllFollowers";
import AllFollowings from "../AllFollowings/AllFollowing";
import CaptionPost from "../CaptionPost/CaptionPost";
import { UpdateDeletePost } from "../AllPosts/UpdateDeletePost";
import ProfileCardInfo from "../ProfileCardInfo/ProfileCardInfo";
import SavedPosts from "../SavedPosts/SavedPosts";
import RemovePost from "../SavedPosts/RemovePost";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SavedVideos from "../SavedVideos/SavedVideos";
import RemoveVideo from "../RemoveVideo/RemoveVideo";
// import { UpdateDeleteVideo } from "../UpdateDeleteVideo/UpdateDeleteVideo";
import AllVideos from "../AllVideos/AllVideos";
import CreateVideo from "../CreateVideo/CreateVideo";
import { UpdateDeleteVideo } from "../UpdateDeleteVideo/UpdateDeleteVideo";

const initialState = {
  isImage: false,
  isCovImg: false,
  isPost: false,
  isOpen: false,
  isFollow: false,
  isFollowing: false,
  isSwipe: true,
  isPostOpen: false,
  isSavedPost: false,
  isSavedPostOpen: false,
  isSavedVideo: false,
  isVideo: false,
  isVideoOpen: false,
  isVideoUpdateDelete: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "showImage":
      return { ...initialState, isImage: !state.isImage, isSwipe: false };

    case "showCovImage":
      return { ...initialState, isCovImg: !state.isCovImg, isSwipe: false };

    case "setIsPost":
      return { ...initialState, isPost: !state.isPost, isSwipe: false };

    case "setIsVideo":
      return { ...initialState, isVideo: !state.isVideo, isSwipe: false };

    case "setIsOpen":
      return { ...initialState, isOpen: !state.isOpen, isSwipe: false };

    case "setIsPostOpen":
      return { ...initialState, isPostOpen: !state.isPostOpen, isSwipe: false };

    case "setIsVideoOpen":
      return {
        ...initialState,
        isVideoOpen: !state.isVideoOpen,
        isSwipe: false,
      };

    case "setIsSavedPostOpen":
      return {
        ...initialState,
        isSavedPostOpen: !state.isSavedPostOpen,
        isSwipe: false,
      };

    case "setIsSavedVideoOpen":
      return {
        ...initialState,
        isSavedVideoOpen: !state.isSavedVideoOpen,
        isSwipe: false,
      };

    case "setIsFollow":
      return { ...initialState, isFollow: !state.isFollow, isSwipe: false };

    case "setIsFollowing":
      return {
        ...initialState,
        isFollowing: !state.isFollowing,
        isSwipe: false,
      };

    case "setSavedPost":
      return {
        ...initialState,
        isSavedPost: !state.isSavedPost,
        isSwipe: false,
      };

    case "setSavedVideo":
      return {
        ...initialState,
        isSavedVideo: !state.isSavedVideo,
        isSwipe: false,
      };

    case "setIsVideoUpdateDelete":
      return {
        ...initialState,
        isVideoUpdateDelete: !state.isVideoUpdateDelete,
        isSwipe: false,
      };

    default:
      alert("");
  }
}

function MyProfile() {
  const { user, BASE_URL, setUser, success, error } = useAuthProvider();

  const [
    {
      isImage,
      isCovImg,
      isPost,
      isOpen,
      isFollow,
      isFollowing,
      isSwipe,
      isPostOpen,
      isSavedPost,
      isSavedPostOpen,
      isSavedVideo,
      isSavedVideoOpen,
      isVideo,
      isVideoOpen,
      isVideoUpdateDelete,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const [selectedPost, setSelectedPost] = useState("");
  const [selectedVideo, setSelectedVideo] = useState("");
  const [selectedSavedPost, setSelectedSavedPost] = useState("");
  const [selectedSavedVideo, setSelectedSavedVideo] = useState("");

  const [posts, setPosts] = useState(user?.posts);
  const [followers, setFollowers] = useState(user?.followers);
  const [followings, setFollowings] = useState(user?.following);
  const [savedPosts, setSavedPosts] = useState(user?.savedPosts);
  const [savedVideos, setSavedVideos] = useState(user?.savedVideos);
  const [videos, setVideos] = useState(user?.videos);

  useEffect(() => {
    async function getUsersPosts() {
      try {
        if (!user.posts) return;

        /////////// All Followers of User ///////////

        const followers = await axios({
          method: "GET",
          url: `${BASE_URL}/api/v1/followuser/getallfollowers/${user._id}`,
        });

        setFollowers(followers?.data?.allFollowers);

        ///////// All Followings of User //////////

        const following = await axios({
          method: "GET",
          url: `${BASE_URL}/api/v1/followuser/getallfollowing/${user._id}`,
        });

        setFollowings(following?.data?.allFollowings);

        ///////////// User's Posts ////////////

        const allPosts = user?.posts?.map(async (id) => {
          const data = await axios({
            method: "GET",
            url: `${BASE_URL}/api/v1/posts/${id}`,
          });

          return data;
        });

        const usersPosts = await Promise.all(allPosts);

        setPosts(usersPosts);

        /////////// User's Saved Posts ///////////

        const allSavedPosts = user?.savedPosts?.map(async (id) => {
          const data = await axios({
            method: "GET",
            url: `${BASE_URL}/api/v1/posts/${id}`,
          });

          return data;
        });

        const usersSavedPosts = await Promise.all(allSavedPosts);

        setSavedPosts(usersSavedPosts);

        ////////// User's Saved Videos /////////////

        const allSavedVideos = user?.savedVideos?.map(async (id) => {
          const data = await axios({
            method: "GET",
            url: `${BASE_URL}/api/v1/video/posts/${id}`,
          });

          return data;
        });

        const usersSavedVideos = await Promise.all(allSavedVideos);

        setSavedVideos(usersSavedVideos);

        /////////// User's Videos //////////

        const videos = user?.videos?.map(async (id) => {
          const data = await axios({
            method: "GET",
            url: `${BASE_URL}/api/v1/video/posts/${id}`,
          });

          return data;
        });

        const usersVideos = await Promise.all(videos);

        setVideos(usersVideos);
      } catch (err) {
        if (err?.response?.data?.message !== undefined) {
          alert(err?.response?.data?.message);
        } else {
          alert("Error while fetching user's posts");
        }
      }
    }
    getUsersPosts();
  }, [user, setUser, BASE_URL]);

  useGSAP(
    () => {
      gsap.from("img", {
        opacity: 0,
        duration: 1,
        delay: 0.1,
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
        <ProfileCardInfo
          user={user}
          followers={followers}
          followings={followings}
          isSwipe={isSwipe}
        />

        <MyProfileDivOutlet dispatch={dispatch} />

        <CaptionPost />

        {isImage && <UploadImage />}

        {isCovImg && <UploadCoverImage />}

        {isPost && posts?.length > 0 && (
          <AllPosts
            setSelectedPost={setSelectedPost}
            isPostOpen={isPostOpen}
            dispatch={dispatch}
            posts={posts}
          />
        )}

        {isPost && posts?.length <= 0 && (
          <p className="no-post-para">You do not have any post yet</p>
        )}

        {isVideo && videos?.length > 0 && (
          <AllVideos
            setSelectedVideo={setSelectedVideo}
            dispatch={dispatch}
            videos={videos}
          />
        )}

        {isVideo && videos?.length <= 0 && (
          <p className="no-post-para">You do not have any video yet</p>
        )}

        {isSavedPost && savedPosts?.length > 0 && (
          <SavedPosts
            setSelectedSavedPost={setSelectedSavedPost}
            isSavedPostOpen={isSavedPostOpen}
            dispatch={dispatch}
            savedPosts={savedPosts}
          />
        )}

        {isSavedPost && savedPosts?.length <= 0 && (
          <p className="no-post-para">You do not have any saved post yet</p>
        )}

        {isSavedVideo && savedVideos?.length > 0 && (
          <SavedVideos
            setSelectedSavedVideo={setSelectedSavedVideo}
            isSavedVideoOpen={isSavedVideoOpen}
            dispatch={dispatch}
            savedVideos={savedVideos}
          />
        )}

        {isSavedVideo && savedVideos?.length <= 0 && (
          <p className="no-post-para">You do not have any saved video yet</p>
        )}

        {isOpen && <UpdateData isOpen={isOpen} dispatch={dispatch} />}

        {isFollow && followers.length <= 0 && (
          <p className="no-post-para">You do not have any follower yet</p>
        )}

        {isFollow && followers.length > 0 && (
          <AllFollowers followers={followers} />
        )}

        {isFollowing && followings.length <= 0 && (
          <p className="no-post-para">You do not follow anybody yet</p>
        )}

        {isFollowing && followings.length > 0 && (
          <AllFollowings followings={followings} />
        )}

        {isPostOpen && (
          <UpdateDeletePost dispatch={dispatch} selectedPost={selectedPost} />
        )}

        {isVideoOpen && (
          <CreateVideo success={success} error={error} dispatch={dispatch} />
        )}

        {isVideoUpdateDelete && (
          <UpdateDeleteVideo
            selectedVideo={selectedVideo}
            success={success}
            error={error}
            dispatch={dispatch}
          />
        )}

        {isSavedPostOpen && (
          <RemovePost
            dispatch={dispatch}
            selectedSavedPost={selectedSavedPost}
          />
        )}

        {isSavedVideoOpen && (
          <RemoveVideo
            dispatch={dispatch}
            selectedSavedVideo={selectedSavedVideo}
          />
        )}
      </div>
    </div>
  );
}

export default MyProfile;
