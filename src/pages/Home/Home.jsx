import { useAuthProvider } from "../../contexts/AuthContext";
import axios from "axios";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import LeftNav from "../../components/LeftNav/LeftNav";
import RightNav from "../../components/RIghtNav/RightNav";
import HomeCenter from "../../components/HomeCenter/HomeCenter";
import { useState } from "react";
import { toast } from "react-toastify";

import "./Home.scss";
import FourMenu from "../../components/FourMenu/FourMenu";

function Home() {
  const { setUser, setIsAuthenticated, BASE_URL, success, error } =
    useAuthProvider();
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  async function handleLogOut() {
    const loading = toast.loading("Logging Out.....");

    try {
      const data = await axios({
        method: "GET",
        url: `${BASE_URL}/api/v1/users/logout`,
      });

      setUser({});
      setIsAuthenticated(false);

      success.play();

      toast.update(loading, {
        render: "Logged Out Successfully",
        type: "success",
        isLoading: false,
        autoClose: 2500,
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
          render: "Error while logging out, Plese try again later!!!",
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
    <div className="home-page">
      <LeftNav onLogOut={handleLogOut} />

      {id ? (
        <Outlet />
      ) : (
        <HomeCenter
          setIsAuthenticated={setIsAuthenticated}
          isOpen={isOpen}
          onOpen={setIsOpen}
        />
      )}

      <RightNav isOpen={isOpen} onOpen={setIsOpen} />

      <div className="right-blue-span"></div>
      <div className="left-blue-span"></div>

      <FourMenu
        isOpen={isOpen}
        onOpen={setIsOpen}
        active={active}
        setActive={setActive}
      />
    </div>
  );
}

export default Home;
