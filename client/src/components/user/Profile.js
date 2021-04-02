import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import UserImage from "../../static/img/user-image.png";
import { getCurrentProfile, addBookId } from "../../actions/profile"; 
import Moment from 'react-moment';


const Profile = ({ profile: { profile: { user, books }, loading }, getCurrentProfile, addBookId }) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  // Filter the books the user has and hasn't read.
  try {
    var reading = books.filter((book) => !book.finished ? book : null)
    var read = books.filter((book) => book.finished ? book : null)
  } catch(err) {
    return null
  }
  // Get the users profile information
  try {
    var firstName = user.firstName;
    var lastName = user.lastName;
    var email = user.email;

  } catch(err) {
    return null
  }


  const bookIdHandler = (b) => {
    addBookId({id: b._id})
  }

  return (
    <Fragment>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div class='profile-page-container'>
          <div class='profile-container'>
            <div class='profile-wrapper'>
              <img src={UserImage} class='profile-image' />
              <h1 class='text-center m-0 profile-name'>{firstName} {lastName}</h1>
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
            <div class="justify-content-center px-2 py-1">
            <Link to="book-search" class="btn-main w-100 text-center">Add Book</Link>
            </div>
            <hr/>
    
            <div class='justify-content-between align-items-center m-1'>
              <h3>Currently Reading</h3>
              <p>
              <Link to='view-all' class="text-secondary">View All</Link>
              </p>
            </div>
          {reading < 1 ? (
            <p class="m-2 mb-4"><Link to="book-search" class="text-main">Search</Link> your first book!</p>
          ):(
            <div class='currently-reading'>
              {reading.map((book) => (
                
                <Link to="book-data" class="profile-book-container" onClick={() => bookIdHandler(book)}>
                  <img src={book.img} />
                  <div class="profile-book-info-container">
                  <p class="justify-content-between"><b>Notes:</b> {book.notes.length}</p>
                  <hr/>
                    <p class="justify-content-between"><b>Started:</b> <Moment format="DD MMM YYYY">{book.startDate}</Moment></p>
                    <p class="justify-content-between"><b>Total Pages:</b> {book.totalPages}</p>
                    <p class="justify-content-between"><b>Current Page:</b> {book.currentPage}</p>
                    <div class="book-loading-container">
                      <div class="book-loading-bar" style={{width: `${100 / (book.totalPages / book.currentPage)}%`}}></div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
            <hr/>
            <div class='justify-content-between align-items-center m-1'>
              <h3>Read</h3>
              <p>
                <Link to='view-all' class="text-secondary">View All</Link>
              </p>
            </div>

            {read < 1 ? (
              <p class="m-2"><Link to="book-search" class="text-main">Add</Link> a book you've already read.</p>
            ):(
              <div class='currently-reading'>
              {read.map((book) => (
               <Link to="book-data" class="profile-book-container" onClick={() => bookIdHandler(book)}>
               <img src={book.img} />
               <div class="profile-book-info-container">
               <p class="justify-content-between"><b>Notes:</b> {book.notes.length}</p>
               <hr/>
                 <p class="justify-content-between"><b>Started:</b> <Moment format="DD MMM YYYY">{book.startDate}</Moment></p>
                 <p class="justify-content-between"><b>Finished:</b> <Moment format="DD MMM YYYY">{book.finishedDate}</Moment></p>
                 <p class="justify-content-between"><b>Total Pages:</b> {book.totalPages}</p>
                 <p class="justify-content-between"><b>Time Taken:</b> <span><Moment from={book.startDate} to={book.finishedDate} format="D"></Moment> Days</span></p>
                 <p class="justify-content-between"><b>PPD:</b> {book.totalPages}</p>
                 <p class="justify-content-between"><b>Your Rating:</b> {book.rating} / 5</p>

               </div>
             </Link>
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
  addBookId: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, addBookId })(Profile);
