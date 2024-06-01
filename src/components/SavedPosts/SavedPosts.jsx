/* eslint-disable */

import { capitalize } from "../LeftNav/LeftNav";
import UserImage from "./../../assets/userImage.jpg";

function SavedPosts({ savedPosts, dispatch, setSelectedSavedPost }) {
  return (
    <>
      {savedPosts?.map((post) => (
        <div key={post?.data?.data?.post?._id} className="all-posts">
          <div className="post-users-div">
            <i
              onClick={() => {
                dispatch({ type: "setIsSavedPostOpen" });
                setSelectedSavedPost(post?.data?.data?.post?._id);
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

          {post?.data?.data?.post?.imageURL && (
            <img
              className="postImage"
              src={post?.data?.data?.post?.imageURL}
              alt="post's image"
            />
          )}

          <p className="post-caption">{post?.data?.data?.post?.caption}</p>
        </div>
      ))}
    </>
  );
}

export default SavedPosts;
