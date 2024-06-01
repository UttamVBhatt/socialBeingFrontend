/* eslint-disable */
import axios from "axios";
import { useAuthProvider } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

export default function RemoveVideo({ dispatch, selectedSavedVideo }) {
  const { BASE_URL, user, setUser, success, error } = useAuthProvider();

  async function handleRemove(e) {
    e.preventDefault();

    const loading = toast.loading("Updating.....");

    try {
      const data = await axios({
        method: "POST",
        url: `${BASE_URL}/api/v1/video/posts/${selectedSavedVideo}/${user._id}`,
      });

      success.play();

      setUser(data?.data?.user);

      toast.update(loading, {
        render: data?.data?.message,
        type: "success",
        isLoading: false,
        autoClose: 1400,
      });

      dispatch({ type: "setIsSavedVideoOpen" });
    } catch (err) {
      if (err?.response?.data?.message !== undefined) {
        error.play();

        toast.update(loading, {
          render: err?.response?.data?.message,
          type: "error",
          isLoading: false,
          autoClose: 2300,
        });
      } else {
        error.play();

        toast.update(loading, {
          render: "Error while adding/removing the post!!!",
          type: "error",
          isLoading: false,
          autoClose: 2300,
        });
      }
    }
  }

  return (
    <div className="update-data-container">
      <div className="data-overlay"></div>

      <div className="update-data-form-container">
        <h3>
          <span style={{ color: "red" }}>Remove Video</span>
        </h3>

        <span onClick={() => dispatch({ type: "setIsSavedVideoOpen" })}>X</span>

        <form className="update-data-form">
          <div>
            <button onClick={handleRemove} type="submit">
              Remove Video
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
