/* eslint-disable */

import backCoverImage from "./../../assets/backCoverImageTwo.jpg";
import UserImage from "./../../assets/userImage.jpg";

import { capitalize } from "../LeftNav/LeftNav";

function ProfileCardInfo({ user, isSwipe, followers, followings }) {
  return (
    <>
      <img src={user?.coverImageURL || backCoverImage} alt="user image" />

      <div className="user-image-div-outlet">
        <img
          src={user?.imageURL || UserImage}
          alt="user's image"
          className="user-image-card-leftNav-outlet"
        />
      </div>

      <div className="user-name-description-div-outlet">
        <p>{capitalize(user?.name) || "User"}</p>
        <p>{user?.description || "Write about yourself"}</p>
      </div>

      <div className="user-follower-following-div-outlet">
        <p className="border-top-outlet"></p>

        <div className="user-follow-data-outlet">
          {isSwipe && (
            <span className="swipe-right-span-my-profile">
              Swipe <i className="fa-solid fa-arrow-right"></i>
            </span>
          )}

          <div className="followers-outlet">
            <p>{followers?.length || 0}</p>
            <p>Followers</p>
          </div>

          <p className="border-center-outlet"></p>

          <div className="following-outlet">
            <p>{followings?.length || 0}</p>
            <p>Following</p>
          </div>

          <p className="border-center-outlet"></p>

          <div className="following-outlet">
            <p>{user?.posts?.length || 0}</p>
            <p>Posts</p>
          </div>
        </div>

        <p className="border-bottom-outlet"></p>
      </div>
    </>
  );
}

export default ProfileCardInfo;
