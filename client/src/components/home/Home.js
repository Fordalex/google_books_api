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
        var homeEnter = document.getElementById('homeEnter');
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
            rightIcon.classList.remove('hidden');
            homeEnter.classList.add('hidden');
            pageOne.classList.add('hidden');
            pageTwo.classList.remove('hidden');
            pageThree.classList.add('hidden');
            pageOneIn.classList.remove('home-page-active');
            pageTwoIn.classList.add('home-page-active');
            pageThreeIn.classList.remove('home-page-active');
        } else if (pageIndicator === 3) {
            leftIcon.classList.remove('hidden');
            rightIcon.classList.add('hidden');
            homeEnter.classList.remove('hidden');
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
      <div id='homePageOne' className='home-page-section'>
        <div>
          <img src={BookIllustrationOne} className='home-illustration' />
          <h1>Made by book lovers for book lovers</h1>
          <p>Enjoy reading? Always forgetting quotes and vital information? This app is for you.</p>
        </div>
      </div>
      <div id='homePageTwo' className='home-page-section hidden'>
        <div>
          <img src={BookIllustrationTwo} className='home-illustration' />
          <h1>Notes</h1>
          <p>Track the books you read, save notes to set pages or titles to refer back to.</p>
        </div>
      </div>
      <div id='homePageThree' className='home-page-section hidden'>
        <div>
          <img src={BookIllustrationThree} className='home-illustration' />
          <h1>Insights</h1>
          <p>
            View the time it took you to read books and find out home many pages per day your reading.
          </p>
        </div>
      </div>
      <div className='home-page-indicator-container'>
      <img src="https://img.icons8.com/windows/32/000000/left.png" className="hidden" id="homeLeftIcon" onClick={onPageChangeHandler}/>
        <div
          id='homePageInOne'
          className='home-page-indicator home-page-active'
        ></div>
        <div id='homePageInTwo' className='home-page-indicator'></div>
        <div id='homePageInThree' className='home-page-indicator'></div>
        <div >
          <img src="https://img.icons8.com/windows/32/000000/right.png" id="homeRightIcon" onClick={onPageChangeHandler}/>
          <Link to="register" id="homeEnter" className="btn-secondary hidden home-right-button">Enter</Link>
        </div>
        
      </div>
      
    </div>
  );
};

export default Home;
