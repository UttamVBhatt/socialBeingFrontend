/* eslint-disable */

import UserImage from "./../../assets/userImage.jpg";
import { Link } from "react-router-dom";

function RightFollowings({ following }) {
  const user = following?.data?.data?.user;

  return (
    <Link to={user?._id}>
      <img src={user?.imageURL || UserImage} alt="users's Image" />

      <div>
        <p>{user?.name}</p>
        <p>{user?.email}</p>
      </div>
    </Link>
  );
}

export default RightFollowings;
