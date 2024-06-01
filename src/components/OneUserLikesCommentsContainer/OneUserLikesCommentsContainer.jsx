/* eslint-disable */

import { capitalize } from "../LeftNav/LeftNav";
import backCoverImage from "./../../assets/backCoverImageTwo.jpg";
import UserImage from "./../../assets/userImage.jpg";

function OneUserLikesCommentsContainer({ oneUser, isSwipe }) {
  return (
    <>
      <img src={oneUser?.coverImageURL || backCoverImage} alt="user image" />

      <div className="user-image-div-outlet">
        <img
          src={oneUser?.imageURL || UserImage}
          alt="user's image"
          className="user-image-card-leftNav-outlet"
        />
      </div>

      <div className="user-name-description-div-outlet">
        <p>{oneUser && capitalize(oneUser?.name)}</p>
        <p>{(oneUser && oneUser?.description) || "Write about yourself"}</p>
      </div>

      <div className="user-follower-following-div-outlet">
        <p className="border-top-outlet"></p>

        <div className="user-follow-data-outlet">
          {isSwipe && (
            <span className="swipe-right-span">
              Swipe <i className="fa-solid fa-arrow-right"></i>
            </span>
          )}
          <div className="followers-outlet">
            <p>{(oneUser && oneUser?.followers?.length) || 0}</p>
            <p>Followers</p>
          </div>

          <p className="border-center-outlet"></p>

          <div className="following-outlet">
            <p>{oneUser?.following?.length || 0}</p>
            <p>Following</p>
          </div>

          <p className="border-center-outlet"></p>

          <div className="following-outlet">
            <p>{oneUser?.posts?.length || 0}</p>
            <p>Posts</p>
          </div>
        </div>

        <p className="border-bottom-outlet"></p>
      </div>
    </>
  );
}

export default OneUserLikesCommentsContainer;
