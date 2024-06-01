/* eslint-disable */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthProvider } from "../../contexts/AuthContext";
import "./UpdateData.scss";
import { toast } from "react-toastify";

import axios from "axios";

function UpdateData({ dispatch, isOpen, setIsOpen }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");

  const { user, setUser, BASE_URL, success, error } = useAuthProvider();

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const loading = toast.loading("Updating Your Data....");

    try {
      const data = await axios({
        method: "PATCH",
        url: `${BASE_URL}/api/v1/users/${user._id}`,
        data: { name, email, city, description },
      });

      setUser(data?.data?.data?.updatedUser);

      navigate(`/me/${user._id}`);

      dispatch ? dispatch({ type: "setIsOpen" }) : setIsOpen(!isOpen);

      success.play();

      toast.update(loading, {
        render: "Data Updated Successfully",
        type: "success",
        isLoading: false,
        autoClose: 1500,
      });
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
          render: "Error while updating your data!!!",
          type: "error",
          isLoading: false,
          autoClose: 2500,
        });
      }
      console.log(err);
      console.log(err?.response?.data?.message);
    }
  }

  return (
    <>
      {isOpen && (
        <div className="update-data-container">
          <div className="data-overlay"></div>

          <div className="update-data-form-container">
            <h3>Update Data</h3>
            <span
              onClick={() =>
                dispatch ? dispatch({ type: "setIsOpen" }) : setIsOpen(!isOpen)
              }
            >
              X
            </span>

            <form className="update-data-form" onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  minLength={3}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Your City"
                  minLength={3}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Description"
                  minLength={5}
                  maxLength={40}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div>
                <button type="submit">Update Data</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default UpdateData;
