/* eslint-disable */

import { NavLink } from "react-router-dom";
import { useAuthProvider } from "../../contexts/AuthContext";
import { useRef, useState } from "react";

import ReelIcon from "./../../assets/reel.png";
import ReelColorIcon from "./../../assets/reelcolor.png";

function FourMenu({ onOpen, isOpen, active, setActive }) {
  const { user } = useAuthProvider();
  const [reel, setReel] = useState(false);

  const menuRef = useRef();

  return (
    <div ref={menuRef} className="four-menu-div">
      <NavLink
        to={"/"}
        onClick={() => {
          setActive(!active);
          setReel(false);
        }}
      >
        {active ? (
          <i className="fa-solid fa-house-chimney"></i>
        ) : (
          <i className="fa-solid fa-house"></i>
        )}
      </NavLink>

      <NavLink
        onClick={() => {
          setActive(true);
          setReel(false);
        }}
        to={`/${user?._id}/all/users`}
      >
        <i className="fa-solid fa-search"></i>
      </NavLink>

      <NavLink
        onClick={() => {
          setActive(true);
          setReel(!reel);
        }}
        to={`/${user?._id}/reels`}
      >
        {reel ? (
          <img src={ReelColorIcon} alt="reel-icon" />
        ) : (
          <img src={ReelIcon} alt="reel-icon" />
        )}
      </NavLink>

      <NavLink
        to={""}
        onClick={() => {
          onOpen(!isOpen);
          setActive(true);
          setReel(false);
        }}
      >
        <i className="fa-solid fa-circle-plus"></i>
      </NavLink>

      <NavLink
        to={`/me/${user?._id}`}
        onClick={() => {
          setActive(false);
          setReel(false);
        }}
      >
        <i className="fa-solid fa-user"></i>
      </NavLink>
    </div>
  );
}

export default FourMenu;
