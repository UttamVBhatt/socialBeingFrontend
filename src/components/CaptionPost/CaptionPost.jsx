/* eslint-disable */

import { useState } from "react";
import userImage from "./../../assets/userImage.jpg";
import axios from "axios";
import { useAuthProvider } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

function CaptionPost() {
  const [caption, setCaption] = useState("");
  const { setPosts, BASE_URL, user, setUser, success, error } =
    useAuthProvider();

  async function handleSubmit() {
    try {
      if (!caption) {
        error.play();
        return toast.error("Please provide a caption!!!", { autoClose: 3000 });
      }

      const formData = new FormData();
      formData.append("caption", caption);

      const loading = toast.loading("Creating post please wait.....");

      const data = await axios({
        method: "POST",
        url: `${BASE_URL}/api/v1/posts/${user._id}`,
        data: formData,
      });

      success.play();

      setPosts(data?.data?.data?.newPost);

      setUser(data?.data?.data?.user);

      toast.update(loading, {
        render: "Post Created.....",
        type: "success",
        isLoading: false,
        autoClose: 1500,
      });

      setCaption(() => "");
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
          render: "Error while creating post, please try again later",
          type: "error",
          isLoading: false,
          autoClose: 2500,
        });
      }
      console.log(err?.response?.data?.message);
      console.log(err);
    }
  }

  return (
    <div className="caption-post-div">
      <div>
        <img src={user?.imageURL || userImage} alt={user?.name} />

        <textarea
          onChange={(e) => setCaption(e.target.value)}
          cols={10}
          rows={1}
          placeholder="What's in your mind ?"
          required
          minLength={3}
          value={caption || ""}
        />

        <button onClick={handleSubmit}>Post</button>
      </div>
    </div>
  );
}

export default CaptionPost;
