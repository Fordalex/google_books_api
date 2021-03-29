import React from "react";
import {Link} from 'react-router-dom';
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
              <p class="m-0 text-center text-main"><b>3</b></p>
              <p class="m-0 text-center">Reading</p>
            </div>
            <div>
              <p class="m-0 text-center text-main"><b>42</b></p>
              <p class="m-0 text-center">Read</p>
            </div>
          </div>
        </div>

        <hr />

        <div class='justify-content-between m-1'>
          <h3>Currently Reading</h3>
          <p><Link to="users-books">View All</Link></p>
        </div>

        <div class='currently-reading'>
          <img src="http://books.google.com/books/content?id=iKdaDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"/>
          <img src="http://books.google.com/books/content?id=6W_IDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"/>
          <img src="http://books.google.com/books/content?id=3tOMDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api" />
        </div>

        <div class='justify-content-between m-1'>
          <h3>Read</h3>
          <p><Link to="users-books">View All</Link></p>
        </div>

        <div class='currently-reading'>
        <img src="http://books.google.com/books/content?id=iKdaDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"/>
          <img src="http://books.google.com/books/content?id=6W_IDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"/>
          <img src="http://books.google.com/books/content?id=3tOMDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api" />
        </div>

      </div>
    </div>
  );
};

export default Profile;
