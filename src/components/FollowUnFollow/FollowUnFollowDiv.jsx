/* eslint-disable */

function FollowUnFollowDiv({ user, oneUser, onFollow, onUnFollow }) {
  return (
    <div className="follow-unfollow-div">
      {user?.following?.includes(oneUser?._id) ? (
        <button onClick={() => onUnFollow(oneUser?._id)}>Unfollow</button>
      ) : (
        <button onClick={() => onFollow(oneUser?._id)}>Follow</button>
      )}
    </div>
  );
}

export default FollowUnFollowDiv;
