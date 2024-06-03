/* eslint-disable */

import { useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { useAuthProvider } from "../../contexts/AuthContext";

function CreateVideo({ dispatch, success, error }) {
  const [file, setFile] = useState("");
  const [caption, setCaption] = useState("");
  const { BASE_URL, user, setUser } = useAuthProvider();

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const loading = toast.loading("Creating post please wait...");

    if (!caption || !file) {
      error.play();

      toast.update(loading, {
        render: "Please provide a video file and a caption for it....",
        type: "error",
        isLoading: "false",
        autoClose: 2000,
      });

      return;
    }

    try {
      const formData = new FormData();
      formData.append("video", file);
      formData.append("caption", caption);

      const data = await axios({
        method: "POST",
        url: `${BASE_URL}/api/v1/video/posts/upload/${user._id}`,
        data: formData,
      });

      success.play();

      setUser(data?.data?.data?.user);

      dispatch({ type: "setIsVideoOpen" });

      toast.update(loading, {
        render: "Post Created Successfylly",
        type: "success",
        isLoading: false,
        autoClose: 2300,
      });

      navigate(`/me/${user._id}`);
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
          render: "Error while creating post, please try again later",
          type: "error",
          isLoading: false,
          autoClose: 2300,
        });
      }

      console.log(err?.response?.data?.message);
      console.log(err);
    }
  }
  return (
    <div className="create-post-container">
      <div className="overlay"></div>

      <div className="create-post-form-container">
        <h3>Create Video</h3>
        <span onClick={() => dispatch({ type: "setIsVideoOpen" })}>X</span>

        <form onSubmit={handleSubmit}>
          <div>
            <textarea
              type="text"
              placeholder="Video's Caption"
              required
              minLength={3}
              onChange={(e) => setCaption(e.target.value)}
              cols={50}
              rows={5}
            />
          </div>

          <div>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              required
            />
          </div>

          <div>
            <button type="submit">Create Video</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateVideo;
