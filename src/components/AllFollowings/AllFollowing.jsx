/*eslint-disable */
import axios from "axios";
import userImage from "./../../assets/userImage.jpg";
import { useAuthProvider } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function AllFollowings({ followings }) {
  const { user, setUser, BASE_URL, success, error } = useAuthProvider();

  return (
    <div className="all-followers-div">
      {followings?.map((following) => (
        <Following
          key={following._id}
          following={following}
          user={user}
          setUser={setUser}
          BASE_URL={BASE_URL}
          success={success}
          error={error}
        />
      ))}
    </div>
  );
}

function Following({ following, user, setUser, BASE_URL, success, error }) {
  async function handleUnfollow(id) {
    try {
      if (!id) return;

      const loading = toast.loading("Unfollowing the user.....");

      const data = await axios({
        method: "DELETE",
        url: `${BASE_URL}/api/v1/followuser/unfollow/${user._id}/${id}`,
      });

      success.play();

      toast.update(loading, {
        render: data?.data?.message,
        type: "success",
        isLoading: false,
        autoClose: 1600,
      });

      setUser(data?.data?.user);
    } catch (err) {
      if (err?.response?.data?.message !== undefined) {
        error.play();

        toast.update(loading, {
          render: err?.response?.data?.message,
          type: "error",
          isLoading: false,
          autoClose: 2100,
        });
      } else {
        error.play();

        toast.update(loading, {
          render: "Error while unfollowing user",
          type: "error",
          isLoading: false,
          autoClose: 2100,
        });
      }
      console.log(err);
    }
  }
  return (
    <div className="follower-div">
      <Link to={`/${following._id}`}>
        <img src={following?.imageURL || userImage} alt={following?.name} />
      </Link>

      <p>{following?.name}</p>
      <button onClick={() => handleUnfollow(following?._id)}>Unfollow</button>
    </div>
  );
}

export default AllFollowings;
