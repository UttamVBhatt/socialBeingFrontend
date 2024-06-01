/* eslint-disable */

import UserImage from "./../../assets/userImage.jpg";
import { capitalize } from "../../components/LeftNav/LeftNav";

function OneUserPosts({ posts, oneUser }) {
  return (
    <>
      {posts?.map((post) => (
        <div key={post._id} className="all-posts">
          <div className="post-users-div">
            <img src={oneUser.imageURL || UserImage} alt="User's Image" />
            <div>
              <p>{capitalize(oneUser.name)}</p>
              <p>{oneUser.email}</p>
            </div>
          </div>

          {post.imageURL && (
            <img
              className="postImage"
              src={post?.imageURL}
              alt="post's image"
            />
          )}

          <p className="post-caption">{post.caption}</p>
        </div>
      ))}
    </>
  );
}

export default OneUserPosts;
