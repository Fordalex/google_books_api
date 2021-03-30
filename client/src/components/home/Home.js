import React from "react";
import {Link} from 'react-router-dom';
import BookIllustrationOne from "../../static/img/book-illustration-one.svg";
import BookIllustrationTwo from "../../static/img/book-illustration-two.svg";
import BookIllustrationThree from "../../static/img/book-illustration-three.svg";

const Home = () => {

    var pageIndicator = 1;

    const onPageChangeHandler = (e) => {
        var pageDirection = e.target.id;
        // incons
        var leftIcon = document.getElementById('homeLeftIcon');
        var rightIcon = document.getElementById('homeRightIcon');
        // pages
        var pageOne = document.getElementById('homePageOne');
        var pageTwo = document.getElementById('homePageTwo');
        var pageThree = document.getElementById('homePageThree');
        // page indicators
        var pageOneIn = document.getElementById('homePageInOne');
        var pageTwoIn = document.getElementById('homePageInTwo');
        var pageThreeIn = document.getElementById('homePageInThree');

        if (pageDirection == 'homeRightIcon') {
            if (pageIndicator < 3) {
                pageIndicator++
            }
        } else {
            if (pageIndicator > 1) {
                pageIndicator--
            }
        }

        if (pageIndicator === 1) {
            leftIcon.classList.add('hidden');
            pageOne.classList.remove('hidden');
            pageTwo.classList.add('hidden');
            pageThree.classList.add('hidden');
            pageOneIn.classList.add('home-page-active');
            pageTwoIn.classList.remove('home-page-active');
            pageThreeIn.classList.remove('home-page-active');
        } else if (pageIndicator === 2) {
            leftIcon.classList.remove('hidden');
            rightIcon.src = 'https://img.icons8.com/windows/32/000000/right.png';
            pageOne.classList.add('hidden');
            pageTwo.classList.remove('hidden');
            pageThree.classList.add('hidden');
            pageOneIn.classList.remove('home-page-active');
            pageTwoIn.classList.add('home-page-active');
            pageThreeIn.classList.remove('home-page-active');
        } else if (pageIndicator === 3) {
            leftIcon.classList.remove('hidden');
            rightIcon.src = 'https://img.icons8.com/metro/32/000000/enter-2.png';
            pageOne.classList.add('hidden');
            pageTwo.classList.add('hidden');
            pageThree.classList.remove('hidden');
            pageOneIn.classList.remove('home-page-active');
            pageTwoIn.classList.remove('home-page-active');
            pageThreeIn.classList.add('home-page-active');
        }
    }


  return (
    <div>
      <div id='homePageOne' class='home-page-section'>
        <div>
          <img src={BookIllustrationOne} class='home-illustration' />
          <h1>Made by book lovers for book lovers</h1>
          <p>Enjoy reading? Always forgetting quotes and vital information? This app is for you.</p>
        </div>
      </div>
      <div id='homePageTwo' class='home-page-section hidden'>
        <div>
          <img src={BookIllustrationTwo} class='home-illustration' />
          <h1>Notes</h1>
          <p>Track the books you read, save notes to set pages or titles to refer back to.</p>
        </div>
      </div>
      <div id='homePageThree' class='home-page-section hidden'>
        <div>
          <img src={BookIllustrationThree} class='home-illustration' />
          <h1>Insights</h1>
          <p>
            View the time it took you to read books and find out home many pages per day your reading.
          </p>
        </div>
      </div>
      <div class='home-page-indicator-container'>
      <img src="https://img.icons8.com/windows/32/000000/left.png" class="hidden" id="homeLeftIcon" onClick={onPageChangeHandler}/>
        <div
          id='homePageInOne'
          class='home-page-indicator home-page-active'
        ></div>
        <div id='homePageInTwo' class='home-page-indicator'></div>
        <div id='homePageInThree' class='home-page-indicator'></div>
        <div >
          <img src="https://img.icons8.com/windows/32/000000/right.png" id="homeRightIcon" onClick={onPageChangeHandler}/>
          <Link to="register" id="homeEnter">Enter</Link>
        </div>
        
      </div>
      
    </div>
  );
};

export default Home;
