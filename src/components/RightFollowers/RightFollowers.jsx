/* eslint-disable */

import UserImage from "./../../assets/userImage.jpg";
import { Link } from "react-router-dom";

function RightFollowers({ follower }) {
  const user = follower?.data?.data?.user;

  return (
    <Link to={user?._id}>
      <img src={user?.imageURL || UserImage} alt="Follower's Image" />

      <div>
        <p>{user?.name}</p>
        <p>{user?.email}</p>
      </div>
    </Link>
  );
}

export default RightFollowers;
