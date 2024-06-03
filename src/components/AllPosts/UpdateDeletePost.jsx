/* eslint-disable */
import axios from "axios";
import { useState } from "react";
import { useAuthProvider } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

export function UpdateDeletePost({ dispatch, selectedPost }) {
  const [isDelete, setIsDelete] = useState(false);
  const [caption, setCaption] = useState("");

  const { BASE_URL, user, setUser, success, error } = useAuthProvider();

  async function handleSubmit(e) {
    e.preventDefault();

    const loading = toast.loading("Updating your post.....");

    try {
      if (!caption || !selectedPost) {
        error.play();

        toast.update(loading, {
          type: "error",
          render: "Please provide a caption or selectedPost",
          isLoading: false,
          autoClose: 2000,
        });

        return;
      }

      const data = await axios({
        method: "PATCH",
        url: `${BASE_URL}/api/v1/posts/${selectedPost}/${user?._id}`,
        data: { caption },
      });

      success.play();

      setUser(data?.data?.data?.user);

      toast.update(loading, {
        render: data?.data?.message,
        type: "success",
        isLoading: false,
        autoClose: 1500,
      });

      dispatch({ type: "setIsPostOpen" });
    } catch (err) {
      if (err?.response?.data?.message !== undefined) {
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
          render: "Error while updating post.....",
          type: "error",
          isLoading: false,
          autoClose: 2500,
        });
      }
      console.log(err);
      console.log(err?.response?.data?.message);
    }
  }

  async function handleDelete(e) {
    e.preventDefault();

    const loading = toast.loading("Deleting your post.....");

    try {
      if (!selectedPost) return;

      const data = await axios({
        method: "DELETE",
        url: `${BASE_URL}/api/v1/posts/${selectedPost}`,
      });

      success.play();

      setUser(data?.data?.user);

      toast.update(loading, {
        render: data?.data?.message,
        type: "success",
        isLoading: false,
        autoClose: 1500,
      });

      dispatch({ type: "setIsPostOpen" });
    } catch (err) {
      if (err?.response?.data?.message !== undefined) {
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
          render: "Error while deleting post, please try again later...",
          type: "error",
          isLoading: false,
          autoClose: 2500,
        });
      }
    }
  }

  return (
    <div className="update-data-container">
      <div className="data-overlay"></div>

      <div className="update-data-form-container">
        <h3 onClick={() => setIsDelete(!isDelete)}>
          Update Post / <span style={{ color: "red" }}>Delete Post</span>
        </h3>
        <span onClick={() => dispatch({ type: "setIsPostOpen" })}>X</span>

        {isDelete ? (
          <form className="update-data-form">
            <div>
              <button onClick={handleDelete} type="submit">
                Delete Post
              </button>
            </div>
          </form>
        ) : (
          <form className="update-data-form" onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                placeholder="Post's Caption"
                minLength={3}
                onChange={(e) => setCaption(e.target.value)}
              />
            </div>

            <div>
              <button type="submit">Update Post</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
