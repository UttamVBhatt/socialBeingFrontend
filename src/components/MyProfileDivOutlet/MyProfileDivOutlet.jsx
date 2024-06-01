/* eslint-disable */
import { useAuthProvider } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function MyProfileDivOutlet({ dispatch }) {
  const { BASE_URL, setUser, setIsAuthenticated, success, error } =
    useAuthProvider();
  const navigate = useNavigate();

  async function handleLogOut() {
    const loading = toast.loading("Logging out......");

    try {
      const data = await axios({
        method: "GET",
        url: `${BASE_URL}/api/v1/users/logout`,
      });

      success.play();

      setUser({});
      setIsAuthenticated(false);

      toast.update(loading, {
        render: "Logged Out Successfully",
        type: "success",
        isLoading: false,
        autoClose: 1500,
      });

      document.cookie = `jwt=${data?.data?.token}`;

      navigate("/");
    } catch (err) {
      if (err !== undefined) {
        error.play();

        toast.update(loading, {
          render: err?.response?.data?.message,
          type: "error",
          isLoading: false,
          autoClose: 2500,
        });
      } else {
        error.play();

        toast.update(loading, {
          render: "Error while logging out, please try again later",
          type: "error",
          isLoading: false,
          autoClose: 2500,
        });
      }
      console.log(err);
      console.log(err?.response?.data?.message);
      navigate("/");
    }
  }

  return (
    <div className="my-profile-div-outlet">
      <div className="features-div">
        <div
          className="update-photo"
          onClick={() => dispatch({ type: "showImage" })}
        >
          <i className="fa-solid fa-image"></i>
          <p>Update Image</p>
        </div>

        <div
          onClick={() => dispatch({ type: "showCovImage" })}
          className="update-cover-photo"
        >
          <i className="fa-solid fa-photo-film"></i>
          <p>Update Cover Image</p>
        </div>

        <div
          onClick={() => dispatch({ type: "setIsVideoOpen" })}
          className="update-cover-photo"
        >
          <i className="fa-solid fa-file-circle-plus"></i>
          <p>Create Video</p>
        </div>

        <div
          onClick={() => dispatch({ type: "setIsVideo" })}
          className="update-cover-photo"
        >
          <i className="fa-regular fa-circle-play"></i>
          <p>My Videos</p>
        </div>

        <div
          onClick={() => dispatch({ type: "setIsPost" })}
          className="my-posts"
        >
          <i className="fa-solid fa-wallet"></i>
          <p>My Posts</p>
        </div>

        <div
          onClick={() => dispatch({ type: "setIsOpen" })}
          className="update-data"
        >
          <i className="fa-solid fa-circle-info"></i>
          <p>Update Data</p>
        </div>

        <div
          onClick={() => dispatch({ type: "setIsFollow" })}
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
          onClick={() => dispatch({ type: "setSavedVideo" })}
          className="my-following"
        >
          <i className="fa-solid fa-file-video"></i>
          <p>Saved Videos</p>
        </div>

        <div
          onClick={() => dispatch({ type: "setSavedPost" })}
          className="my-following"
        >
          <i className="fa-solid fa-bookmark"></i>
          <p>Saved Posts</p>
        </div>

        <div onClick={handleLogOut} className="my-following log-out">
          <i className="fa-solid fa-right-from-bracket"></i>
          <p>LogOut</p>
        </div>
      </div>
    </div>
  );
}

export default MyProfileDivOutlet;
