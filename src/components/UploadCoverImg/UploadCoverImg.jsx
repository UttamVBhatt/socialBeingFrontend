/* eslint-disable */

import { useState } from "react";
import axios from "axios";
import { useAuthProvider } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

function UploadCoverImage() {
  const [file, setFile] = useState("");
  const { user, setUser, BASE_URL, success, error } = useAuthProvider();

  async function handleSubmit(e) {
    e.preventDefault();

    const loading = toast.loading("Updating your cover image....");

    try {
      if (!file) {
        alert("Please provide a file");
        return;
      }

      const formData = new FormData();

      formData.append("photo", file);

      const data = await axios({
        method: "POST",
        url: `${BASE_URL}/api/v1/users/upload/coverphoto/${user._id}`,
        data: formData,
      });

      success.play();

      toast.update(loading, {
        render: data?.data?.message,
        type: "success",
        isLoading: false,
        autoClose: 1500,
      });

      setUser(data?.data?.user);

      setFile("");
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
          render: "Error while uploading cover image",
          type: "error",
          isLoading: false,
          autoClose: 2100,
        });
      }
    }
  }

  return (
    <div className="upload-image">
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />

        <button>Upload Cover Image</button>
      </form>
    </div>
  );
}

export default UploadCoverImage;
