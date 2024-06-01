/* eslint-disable */

import { Link } from "react-router-dom";

function Comment({
  commentObj,
  user,
  dispatch,
  isVisible,
  deleteComment,
  post,
  userImage,
}) {
  return (
    <div className="one-comment-div">
      <Link
        to={
          commentObj?.user?._id === user._id
            ? `/me/${user?._id}`
            : `/${commentObj?.user?._id}`
        }
      >
        <img
          src={commentObj?.user?.imageURL || userImage}
          alt={commentObj?.user?.name}
        />
        <p>{commentObj?.user?.name}</p>
      </Link>

      <p>{commentObj?.comment}</p>

      {(isVisible && commentObj?._id && commentObj?.user._id === user?._id) ||
      (isVisible && commentObj?._id && post?.user?._id === user?._id) ? (
        <span
          onClick={() => deleteComment(commentObj)}
          className="delete-comment-span active"
        >
          Delete
        </span>
      ) : (
        <span className="delete-comment-span">Delete</span>
      )}

      {/* {console.log(post, commentObj, user)} */}

      {commentObj?._id && post?.user?._id === user?._id && (
        <i
          onClick={() => dispatch({ type: "showDelete" })}
          className="fa-solid fa-ellipsis-vertical"
        ></i>
      )}

      {commentObj?._id && commentObj?.user?._id === user?._id && (
        <i
          onClick={() => dispatch({ type: "showDelete" })}
          className="fa-solid fa-ellipsis-vertical"
        ></i>
      )}
    </div>
  );
}

export default Comment;
