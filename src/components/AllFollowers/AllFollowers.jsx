/*eslint-disable */
import { Link } from "react-router-dom";
import userImage from "./../../assets/userImage.jpg";

function AllFollowers({ followers }) {
  return (
    <div className="all-followers-div">
      {followers?.map((follower) => (
        <Follower key={follower._id} follower={follower} />
      ))}
    </div>
  );
}

function Follower({ follower }) {
  return (
    <div className="follower-div">
      <Link to={`/${follower._id}`}>
        <img src={follower?.imageURL || userImage} alt={follower?.name} />
      </Link>

      <p>{follower?.name}</p>
    </div>
  );
}

export default AllFollowers;
