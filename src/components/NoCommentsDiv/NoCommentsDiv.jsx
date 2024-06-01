import NoCommentsImage from "./../../assets/nocomments.jpg";

function NoCommentsDiv() {
  return (
    <div className="no-comments-div">
      <img src={NoCommentsImage} alt="No comment's Image" />
      <p>Be the first one to comment on this post</p>
    </div>
  );
}

export default NoCommentsDiv;
