/* eslint-disable */

import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthProvider } from "../../contexts/AuthContext";

import "./RightNav.scss";

import FourMenu from "../FourMenu/FourMenu";
import RightFollowings from "../RightFollowings/RightFollowers";
import RightFollowers from "../RightFollowers/RightFollowers";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function RightNav({ onOpen, isOpen }) {
  const { user, BASE_URL } = useAuthProvider();
  const [followers, setFollowers] = useState(user?.followers);
  const [followings, setFollowings] = useState(user?.following);
  const [active, setActive] = useState(true);

  useEffect(() => {
    async function getAllFollowers() {
      try {
        if (!user) return;

        if (!user?.followers || !user?.following) return;

        const allFollowers = user?.followers?.map(async (follower) => {
          const followers = await axios({
            method: "GET",
            url: `${BASE_URL}/api/v1/users/${follower}`,
          });

          return followers;
        });

        const myFollowers = await Promise.all(allFollowers);

        setFollowers(myFollowers);

        const allFollowings = user?.following?.map(async (following) => {
          const followings = await axios({
            method: "GET",
            url: `${BASE_URL}/api/v1/users/${following}`,
          });

          return followings;
        });

        const myFollowings = await Promise.all(allFollowings);

        setFollowings(myFollowings);
      } catch (err) {
        if (err?.response?.data?.message !== undefined) {
          alert(err?.response?.data?.message);
        } else {
          alert("Error while fetching your followers and following");
        }
      }
    }
    getAllFollowers();
  }, [user]);

  useGSAP(
    () => {
      gsap.from(".intro-para", {
        x: 100,
        opacity: 0,
        duration: 1,
        delay: 0.3,
      });

      gsap.from(".my-followers-div", {
        y: 100,
        opacity: 0,
        duration: 1,
        delay: 0.3,
      });

      gsap.from(".four-menu-div a", {
        opacity: 0,
        y: 70,
        stagger: 0.2,
      });
    },
    { scope: ".right-nav" }
  );

  return (
    <div className="right-nav">
      <FourMenu
        onOpen={onOpen}
        isOpen={isOpen}
        active={active}
        setActive={setActive}
      />

      <p className="intro-para">
        Share your thoughts, photos, and experiences. Let the world see your
        unique perspective.
      </p>

      <div className="my-followers-div">
        <h3>My Followers</h3>

        <div>
          {followers?.length > 0 ? (
            followers?.map((follower) => (
              <RightFollowers
                follower={follower}
                key={follower?.data?.data?.data?.user._id}
              />
            ))
          ) : (
            <p>You do not have any follower yet.</p>
          )}
        </div>

        <h3>My Following</h3>

        <div>
          {followings?.length > 0 ? (
            followings?.map((following) => (
              <RightFollowings
                following={following}
                key={following?.data?.data?.data?.user._id}
              />
            ))
          ) : (
            <p>You do not follow any user.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default RightNav;
