/* eslint-disable */
function OneUserDivOutlet({ isArrow, dispatch }) {
  return (
    <div className="my-profile-div-outlet">
      <div className="features-div">
        <div
          onClick={() => dispatch({ type: "setIsPost" })}
          className="my-posts"
        >
          <i className="fa-solid fa-wallet"></i>
          <p>Posts</p>
        </div>

        <div
          onClick={() => dispatch({ type: "setIsFollowers" })}
          className="my-followers"
        >
          <i className="fa-solid fa-users"></i>
          <p>Followers</p>
        </div>

        <div
          onClick={() => dispatch({ type: "setIsFollowing" })}
          className="my-following"
        >
          <i className="fa-solid fa-circle-user"></i>
          <p>Following</p>
        </div>

        <div
          onClick={() => dispatch({ type: "setIsArrow" })}
          className="my-following"
        >
          {isArrow ? (
            <i className="fa-solid fa-arrows-up-to-line"></i>
          ) : (
            <i className="fa-solid fa-arrows-down-to-line"></i>
          )}
          <p>Follow / Unfollow</p>
        </div>
      </div>
    </div>
  );
}

export default OneUserDivOutlet;
