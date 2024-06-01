/* eslint-disable */

import Comment from "../Comment/Comment";

function AllCommentsDiv({
  user,
  comments,
  dispatch,
  isVisible,
  deleteComment,
  post,
  userImage,
}) {
  return (
    <div className="comments-div">
      {comments?.map((commentObj, i) => (
        <Comment
          key={i}
          user={user}
          commentObj={commentObj}
          dispatch={dispatch}
          isVisible={isVisible}
          deleteComment={deleteComment}
          post={post}
          userImage={userImage}
        />
      ))}
    </div>
  );
}

export default AllCommentsDiv;
