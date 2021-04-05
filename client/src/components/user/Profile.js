import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import UserImage from "../../static/img/user-image.png";
import { getCurrentProfile } from "../../actions/profile";
import ProfileBook from "./books/ProfileBook";
import { check } from "express-validator";

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

  const [viewBooks, setViewBooks] = useState("currentlyReading");

  // Filter the books the user has and hasn't read.
  try {
    var reading = books.filter((book) => (book.readingStatus == 'reading' ? book : null));
    var read = books.filter((book) => (book.readingStatus == 'read' ? book : null));
    var uncompleted = books.filter((book) => (book.readingStatus == 'uncompleted' ? book : null));
  } catch (err) {
    return null;
  }
  // Get the users profile information
  var firstName;
  var lastName;
  var email;
  var currentlyReadingContainer;
  var readContainer;
  var uncompletedContainer;

  const makeResponsive = () => {
    currentlyReadingContainer = document.getElementById(
      "currentlyReadingContainer"
    );
    readContainer = document.getElementById("readContainer");
    uncompletedContainer = document.getElementById("uncompletedContainer");
    try {
      var currentlyReadingLink = document.getElementById("currentlyReadingLink");
      var readLink = document.getElementById("readLink");
      var uncompletedLink = document.getElementById("uncompletedLink");
  
      if (viewBooks == "currentlyReading") {
        currentlyReadingLink.classList.add("nav-profile-selected");
        currentlyReadingContainer.classList.remove("hidden");
        readLink.classList.remove("nav-profile-selected");
        readContainer.classList.add("hidden");
        uncompletedLink.classList.remove("nav-profile-selected");
        uncompletedContainer.classList.add("hidden");
      } else if (viewBooks == "read") {
        currentlyReadingLink.classList.remove("nav-profile-selected");
        currentlyReadingContainer.classList.add("hidden");
        readLink.classList.add("nav-profile-selected");
        readContainer.classList.remove("hidden");
        uncompletedLink.classList.remove("nav-profile-selected");
        uncompletedContainer.classList.add("hidden");
      } else {
        currentlyReadingLink.classList.remove("nav-profile-selected");
        currentlyReadingContainer.classList.add("hidden");
        readLink.classList.remove("nav-profile-selected");
        readContainer.classList.add("hidden");
        uncompletedLink.classList.add("nav-profile-selected");
        uncompletedContainer.classList.remove("hidden");
      }
    return true;
    } catch (err) {
      setTimeout(() => {
        makeResponsive();
        console.log('make responsive')
      }, 200)
    }
  }


  try {
    firstName = user.firstName;
    lastName = user.lastName;
    email = user.email;
  } catch {
    firstName = null;
    lastName = null;
    email = null;
  }

  const checkWindowWidth = () => {
    var res = makeResponsive();
    if (window.innerWidth < 815 && res) {
      currentlyReadingContainer.classList.remove("hidden");
      readContainer.classList.remove("hidden");
      uncompletedContainer.classList.remove("hidden");
    } else if (!res) {
      setTimeout(() => {
        checkWindowWidth()
      }, 1000)
    }
  };

  window.addEventListener("resize", checkWindowWidth);

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
                <div class="p-1">
                  <p>more account information and stats</p>
                  <p>more account information and stats</p>
                  </div>
              </div>
            </div>
            <div class='profile-books-container'>
              <nav class='profile-nav'>
                <ul>
                  <li
                    class='nav-profile-selected'
                    id='currentlyReadingLink'
                    onClick={() => setViewBooks("currentlyReading")}
                  >
                    Currently Reading
                  </li>
                  <li id='readLink' onClick={() => setViewBooks("read")}>
                    Read
                  </li>
                  <li
                    id='uncompletedLink'
                    onClick={() => setViewBooks("uncompleted")}
                  >
                    Uncompleted
                  </li>
                  <li class='float-right m-0'>
                    <Link to='view-all' class='text-secondary'>
                      View All
                    </Link>
                  </li>
                </ul>
                <hr class='mt-2' />
              </nav>

              <div class='mobile-book-title-container'>
                <h3>Currently Reading</h3>
                <p>
                  <Link to='view-all' class='text-secondary'>
                    View All
                  </Link>
                </p>
              </div>
              <div id='currentlyReadingContainer'>
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
              </div>
              <div class='mobile-book-title-container'>
                <h3>Read</h3>
                <p>
                  <Link to='view-all' class='text-secondary'>
                    View All
                  </Link>
                </p>
              </div>
              <div id='readContainer'>
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
                <hr />
              </div>
              <div class='mobile-book-title-container'>
                <h3>Uncompleted</h3>
                <p>
                  <Link to='view-all' class='text-secondary'>
                    View All
                  </Link>
                </p>
              </div>
              <div id='uncompletedContainer'>
                {uncompleted < 1 ? (
                  <p class='m-2'>
                    <Link to='book-search' class='text-main'>
                      Add
                    </Link>{" "}
                    a book if you didn't manage to finish it.
                  </p>
                ) : (
                  <div class='currently-reading'>
                 
                    {uncompleted.map((book) => (
                      <ProfileBook book={book} />
                    ))}
                  </div>

                )}
              </div>
            </div>
          </div>
          {checkWindowWidth()}
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

export default connect(mapStateToProps, { getCurrentProfile })(Profile);
