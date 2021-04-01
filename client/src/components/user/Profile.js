import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import UserImage from "../../static/img/user-image.png";
import { getCurrentProfile } from "../../actions/profile";

const Profile = ({ profile: { profile: { user, reading, read }, loading }, getCurrentProfile }) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return (
    <Fragment>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div class='profile-page-container'>
          <div class='profile-container'>
            <div class='profile-wrapper'>
              <img src={UserImage} class='profile-image' />
              <h1 class='text-center m-0 profile-name'>{user.name}</h1>
              <p class='text-center m-0'>
                <small class='profile-username'>{user.email}</small>
              </p>
              <div class='profile-stats-container'>
                <div>
                  <p class='m-0 text-center text-main'>
                    <b>{reading.length}</b>
                  </p>
                  <p class='m-0 text-center'>Reading</p>
                </div>
                <div>
                  <p class='m-0 text-center text-main'>
                    <b>{read.length}</b>
                  </p>
                  <p class='m-0 text-center'>Read</p>
                </div>
              </div>
            </div>

            <hr />

            <div class='justify-content-between align-items-center m-1'>
              <h3>Currently Reading</h3>
              <p>
                <Link to='users-books' class="text-secondary">View All</Link>
              </p>
            </div>

          {reading < 1 ? (
            <p class="m-2 mb-4"><Link to="book-search" class="text-main">Search</Link> your first book!</p>
          ):(
            <div class='currently-reading'>
              {reading.map((book) => (
               <img src={book.img} />
              ))}
            </div>
          )}
            <hr/>
            <div class='justify-content-between align-items-center m-1'>
              <h3>Read</h3>
              <p>
                <Link to='users-books' class="text-secondary">View All</Link>
              </p>
            </div>

            {read < 1 ? (
              <p class="m-2"><Link to="book-search" class="text-main">Add</Link> a book you've already read.</p>
            ):(
              <div class='currently-reading'>
              {read.map((book) => (
               <img src={book.img} />
              ))}
            </div>
            )}

          
          </div>
        </div>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Profile);
