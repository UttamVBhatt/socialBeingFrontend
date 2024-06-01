/* eslint-disable */

import { Link } from "react-router-dom";

function OneUserFollower({ follower, id, user }) {
  return (
    <div className="follower-div">
      <Link to={id === user._id ? `/me/${user._id}` : `/${follower._id}`}>
        <img src={follower?.imageURL || UserImage} alt={follower?.name} />
      </Link>

      <p>{follower?.name}</p>
    </div>
  );
}

export default OneUserFollower;
