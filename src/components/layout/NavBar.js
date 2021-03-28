import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import UserImage from "../../static/img/user-image.png";
import anime from "animejs/lib/anime.es.js";

const NavBar = () => {

    const toggleNavHandler = () => {

        var navContainer = document.getElementById('nav-container');

        if (navContainer.classList.contains('nav-closed')) {
            navContainer.classList.remove('nav-closed');
            anime({
                targets: "#nav-container",
                keyframes: [
                    { translateY: "0vh", duration: 0 },
                    { translateY: "-200vh", duration: 500 },
                  ],
                duration: 1000,
                easing: 'easeInOutQuad',
                loop: false,
              });
        } else {
            navContainer.classList.add('nav-closed');
            anime({
                targets: "#nav-container",
                keyframes: [
                    { translateY: "-200vh", duration: 0 },
                    { translateY: "0vh", duration: 500 },
                  ],
                duration: 1000,
                easing: 'easeInOutQuad',
                loop: false,
              });
        }
    }


  return (
    <Fragment>
      <nav>
        <img src='https://img.icons8.com/flat-round/40/000000/book.png' />
        <div class='burger-menu-container' onClick={toggleNavHandler}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </nav>
      <div id='nav-container' class="closed">
        <div class='justify-content-start'>
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
          <li><Link to="profile" onClick={toggleNavHandler}>Profile</Link></li>
          <li><Link to="book-search" onClick={toggleNavHandler}>Search Books</Link></li>
        </ul>
      </div>
    </Fragment>
  );
};

export default NavBar;
