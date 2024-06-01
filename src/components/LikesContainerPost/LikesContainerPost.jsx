/*eslint-disable */

function LikesContainerPost({
  user,
  post,
  likes,
  comments,
  unlikePost,
  likePost,
  handleSavedPost,
}) {
  return (
    <>
      <div
        onClick={
          user?.likedPosts?.length > 0 && user?.likedPosts?.includes(post?._id)
            ? unlikePost
            : likePost
        }
      >
        <i
          style={
            user?.likedPosts?.length > 0 &&
            user?.likedPosts?.includes(post?._id)
              ? { color: "blue" }
              : { color: "rgba(255, 0, 0, 0.656)" }
          }
          className="fa-regular fa-thumbs-up"
        ></i>

        <p>
          {likes || 0} (
          {user?.likedPosts?.includes(post?._id) ? "Liked" : "Likes"} )
        </p>
      </div>

      <div>
        <i className="fa-regular fa-comment-dots"></i>
        <p>{(comments?.length > 0 && comments?.length) || "Comments"}</p>
      </div>

      <div onClick={handleSavedPost}>
        {user?.savedPosts?.includes(post?._id) ? (
          <i className="fa-solid fa-bookmark"></i>
        ) : (
          <i className="fa-regular fa-bookmark"></i>
        )}
        <p>{user?.savedPosts?.includes(post?._id) ? "Saved" : "Save"}</p>
      </div>
    </>
  );
}

export default LikesContainerPost;
