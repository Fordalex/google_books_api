import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import UserImage from "../../static/img/user-image.png";
import anime from "animejs/lib/anime.es.js";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";

const NavBar = ({
  auth,
  logout,
  profile: {
    loading,
    profile: { user },
  },
}) => {
  const toggleNavHandler = (log) => {
    if (log == "logout") {
      logout();
    }

    var navContainer = document.getElementById("nav-container");

    if (navContainer.classList.contains("nav-opend")) {
      // navigation bar closed
      navContainer.classList.remove("nav-opend");
      anime({
        targets: "#nav-container",
        keyframes: [
          { translateY: "0vh", duration: 0 },
          { translateY: "-220vh", duration: 500 },
        ],
        easing: "easeInOutQuad",
        loop: false,
      });
    } else {
      // navigation bar open
      navContainer.classList.add("nav-opend");
      anime({
        targets: "#nav-container",
        keyframes: [
          { translateY: "-220vh", duration: 0 },
          { translateY: "0vh", duration: 500 },
        ],
        easing: "easeInOutQuad",
        loop: false,
      });
    }
  };

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
      <nav class="main-nav">
        <Link class='nav-app-name' to='/'>
         TheNoteWorthy
        </Link>
        {!auth.isAuthenticated ? (
          <Link
            to='login'
            class='btn-main'>
            Login
          </Link>
        ) : (
          <Fragment>
            <div id='nav-container'>
              <div class='justify-content-start m-1'>
                <div>
                  <img src={UserImage} class='nav-image' />
                </div>
                <div class='align-items-center'>
                  <div class='m-1'>
                    {loading ? (
                      <p>Loading...</p>
                    ) : (
                      <Fragment>
                        <h3>
                          {firstName} {lastName}
                        </h3>
                        <p>{email}</p>
                      </Fragment>
                    )}
                  </div>
                </div>
              </div>
              <hr />
              <ul class='mobile-nav-link-container'>
                <li>
                  <img
                    src='https://img.icons8.com/fluent/30/000000/user-male-circle.png'
                    class='m-1'
                  />
                  <Link to='profile' onClick={toggleNavHandler}>
                    Profile
                  </Link>
                </li>
                <li>
                  <img
                    src='https://img.icons8.com/fluent/30/000000/search.png'
                    class='m-1'
                  />
                  <Link to='book-search' onClick={toggleNavHandler}>
                    Search Books
                  </Link>
                </li>
                <li>
                  <img
                    src='https://img.icons8.com/fluent/30/000000/settings.png'
                    class='m-1'
                  />
                  <Link to='settings' onClick={toggleNavHandler}>
                    Settings
                  </Link>
                </li>
                <li>
                  <img
                    src='https://img.icons8.com/fluent/30/000000/export.png'
                    class='m-1'
                  />
                  <Link
                    onClick={() => {
                      toggleNavHandler("logout");
                    }}
                  >
                    Log Out
                  </Link>
                </li>
              </ul>
            </div>
            <div class='burger-menu-container' onClick={toggleNavHandler}>
              <div class='top-burger'></div>
              <div class='mid-burger'></div>
              <div class='bottom-burger'></div>
            </div>
            <ul class='desktop-nav-links'>
                <li>
                  <Link to='profile'>
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to='book-search' >
                    Search Books
                  </Link>
                </li>
                <li>
                  <Link to='settings' >
                    Settings
                  </Link>
                </li>
              </ul>
              <ul class='desktop-nav-links'>
              <li>
                  <Link onClick={() => {
                      toggleNavHandler("logout");
                    }}
                  >
                    Log Out
                  </Link>
                </li>
              </ul>
          </Fragment>
        )}
      </nav>
    </Fragment>
  );
};

NavBar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { logout })(NavBar);
