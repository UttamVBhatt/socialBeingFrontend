/* eslint-disable */

import { Link } from "react-router-dom";
import UserImage from "./../../assets/userImage.jpg";

function OneUserFollowing({ id, user, following }) {
  return (
    <div className="follower-div">
      <Link to={id === user?._id ? `/me/${user?._id}` : `/${following._id}`}>
        <img src={following?.imageURL || UserImage} alt={following?.name} />
      </Link>

      <p>{following?.name}</p>
    </div>
  );
}

export default OneUserFollowing;
