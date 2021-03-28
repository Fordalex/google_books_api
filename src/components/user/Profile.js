import React from "react";
import UserImage from "../../static/img/user-image.png";

const Profile = () => {
  return (
    <div class='profile-page-container'>
      <div class='profile-container'>
        <div class='profile-wrapper'>
          <img src={UserImage} class='profile-image' />
          <h1 class='text-center m-0 profile-name'>Alex Ford</h1>
          <p class='text-center m-0'>
            <small class="profile-username">Username</small>
          </p>
          <div class='profile-stats-container'>
            <div>
              <p class="m-0 text-center"><b>12345</b></p>
              <p class="m-0 text-center">Reading</p>
            </div>
            <div>
              <p class="m-0 text-center"><b>12345</b></p>
              <p class="m-0 text-center">Read</p>
            </div>
          </div>
        </div>

        <hr />

        <div class='justify-content-between m-1'>
          <h3>Currently Reading</h3>
          <p>See All</p>
        </div>

        <div class='currently-reading'>
          <img />
          <img />
          <img />
        </div>

        <div class='justify-content-between m-1'>
          <h3>Read</h3>
          <p>See All</p>
        </div>

        <div class='currently-reading'>
          <img />
          <img />
          <img />
        </div>

      </div>
    </div>
  );
};

export default Profile;
