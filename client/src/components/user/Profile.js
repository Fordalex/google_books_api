import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import UserImage from "../../static/img/user-image.png";
import { getCurrentProfile } from "../../actions/profile";
import ProfileBook from "./books/ProfileBook";

const Profile = ({
  profile: {
    profile: { user, books },
    loading,
  },
  getCurrentProfile,
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  // Filter the books the user has and hasn't read.
  try {
    var reading = books.filter((book) => (!book.finished ? book : null));
    var read = books.filter((book) => (book.finished ? book : null));
  } catch (err) {
    return null;
  }
  // Get the users profile information
  try {
    var firstName = user.firstName;
    var lastName = user.lastName;
    var email = user.email;
  } catch (err) {
    var firstName = null;
    var lastName = null;
    var email = null;
  }

  return (
    <Fragment>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Fragment>
          <div class='profile-page-container'>
            <div class='profile-info-container'>
              <div class='profile-container'>
                <div class='profile-wrapper'>
                  <img src={UserImage} class='profile-image' />
                  <h1 class='text-center m-0 profile-name'>
                    {firstName} {lastName}
                  </h1>
                  <p class='text-center m-0'>
                    <small class='profile-username'>{email}</small>
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
                <div class='justify-content-center px-2 py-1'>
                  <Link to='book-search' class='btn-main w-100 text-center'>
                    Add Book
                  </Link>
                </div>
                <hr />
                more account information and stats
              </div>
            </div>
            <div class='profile-books-container'>
              <nav class="profile-nav">
                <ul>
                  <li class="nav-profile-selected">Currently Reading</li>
                  <li>Read</li>
                  <li>Uncompleted</li>
                </ul>
                <hr class="mt-2"/>
              </nav>
       
              <div class='justify-content-between align-items-center mx-1'>
                <h3>Currently Reading</h3>
                <p>
                  <Link to='view-all' class='text-secondary'>
                    View All
                  </Link>
                </p>
              </div>
              {reading < 1 ? (
                <p class='m-2 mb-4'>
                  <Link to='book-search' class='text-main'>
                    Search
                  </Link>{" "}
                  a book your reading!
                </p>
              ) : (
                <div class='currently-reading'>
                  {reading.map((book) => (
                    <ProfileBook book={book}/>
                  ))}
                </div>
              )}
              <hr />
              <div class='justify-content-between align-items-center m-1'>
                <h3>Read</h3>
                <p>
                  <Link to='view-all' class='text-secondary'>
                    View All
                  </Link>
                </p>
              </div>

              {read < 1 ? (
                <p class='m-2'>
                  <Link to='book-search' class='text-main'>
                    Add
                  </Link>{" "}
                  a book you've already read.
                </p>
              ) : (
                <div class='currently-reading'>
                  {read.map((book) => (
                    <ProfileBook book={book}/>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Fragment>
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

export default connect(mapStateToProps, { getCurrentProfile })(
  Profile
);
