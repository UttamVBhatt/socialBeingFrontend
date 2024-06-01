/* eslint-disable */

import { capitalize } from "../LeftNav/LeftNav";
import UserImage from "./../../assets/userImage.jpg";

function AllVideos({ videos, dispatch, setSelectedVideo }) {
  return (
    <>
      {videos?.map((post) => (
        <div key={post?.data?.data?.post?._id} className="all-posts">
          <div className="post-users-div">
            <i
              onClick={() => {
                dispatch({ type: "setIsVideoUpdateDelete" });
                setSelectedVideo(post?.data?.data?.post?._id);
              }}
              className="fa-solid fa-ellipsis-vertical"
            ></i>
            <img
              src={post?.data?.data?.post?.user?.imageURL || UserImage}
              alt="User's Image"
            />
            <div>
              <p>{capitalize(post?.data?.data?.post?.user?.name)}</p>
              <p>{post?.data?.data?.post?.user?.email}</p>
            </div>
          </div>

          {post?.data?.data?.post?.videoURL && (
            <video
              className="postImage"
              src={post?.data?.data?.post?.videoURL}
              controls
              controlsList="nodownload"
            ></video>
          )}

          <p className="post-caption">{post?.data?.data?.post?.caption}</p>
        </div>
      ))}
    </>
  );
}

export default AllVideos;
