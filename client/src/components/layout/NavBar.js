import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import UserImage from "../../static/img/user-image.png";
import anime from "animejs/lib/anime.es.js";
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import {logout} from '../../actions/auth';

const NavBar = ({auth, logout}) => {

    const toggleNavHandler = (log) => {
        if (log == 'logout') {
          logout();
        }

        var navContainer = document.getElementById('nav-container');

        if (navContainer.classList.contains('nav-opend')) {
          // navigation bar closed
            navContainer.classList.remove('nav-opend');
            anime({
                targets: "#nav-container",
                keyframes: [
                    { translateY: "0vh", duration: 0 },
                    { translateY: "-200vh", duration: 500 },
                  ],
                easing: 'easeInOutQuad',
                loop: false,
              });
        } else {
          // navigation bar open
            navContainer.classList.add('nav-opend');
            anime({
                targets: "#nav-container",
                keyframes: [
                    { translateY: "-200vh", duration: 0 },
                    { translateY: "0vh", duration: 500 },
                  ],
                easing: 'easeInOutQuad',
                loop: false,
              });
        }
    }


  return (
    <Fragment>
      <nav>
        <img src='https://img.icons8.com/flat-round/40/000000/book.png' />
        {!auth.isAuthenticated ? (
          <Link to="login" class="btn-main p-1
          ">Login</Link>
        ) :(
          <div class='burger-menu-container' onClick={toggleNavHandler}>
          <div class="top-burger"></div>
          <div class="mid-burger"></div>
          <div class="bottom-burger"></div>
        </div>
        )}
      
       
      </nav>
      <div id='nav-container'>
        <div class='justify-content-start m-1'>
          <div>
            <img src={UserImage} class='nav-image' />
          </div>
          <div class='align-items-center'>
            <div class="m-1">
              <h3>First Last</h3>
              <p>Username</p>
            </div>
          </div>
        </div>
        <hr />
        <ul class='nav-link-container'>
          <li><img src="https://img.icons8.com/fluent/30/000000/user-male-circle.png" class="m-1"/><Link to="profile" onClick={toggleNavHandler}>Profile</Link></li>
          <li><img src="https://img.icons8.com/fluent/30/000000/search.png" class="m-1"/><Link to="book-search" onClick={toggleNavHandler}>Search Books</Link></li>
          <li><img src="https://img.icons8.com/fluent/30/000000/settings.png" class="m-1"/><Link to="settings" onClick={toggleNavHandler}>Settings</Link></li>
          <li><img src="https://img.icons8.com/fluent/30/000000/export.png" class="m-1"/><Link onClick={() => {toggleNavHandler("logout")}}>Log Out</Link></li>
        </ul>
      </div>
    </Fragment>
  );
};

NavBar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {logout})(NavBar);
