import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const EditBookData = ({
  profile: {
    profile: { books },
    book: { id },
  },
}) => {
  var book = books.filter((book) => (book._id == id ? book : null))[0];

  var startDateFormatted = <Moment format='YYYY-MM-DD'>{book.startDate}</Moment>;
  console.log(startDateFormatted.toString())


  return (
    <div>
      <Link to='profile'>
        <img
          class='info-back-button'
          src='https://img.icons8.com/ios/35/000000/circled-left-2.png'
        />
      </Link>

      {book.img ? (
        <img class='book-info-img' src={book.img} />
      ) : (
        <p class='book-info-img'>No Image</p>
      )}
      <div class='book-all-info-container'>
        <div class='book-all-title-container'>
          <div>
            <h3>{book.title}</h3>
          </div>
          <div class='d-flex-center'>
            <img
              class='love-icon'
              src='https://img.icons8.com/material-outlined/24/000000/filled-like.png'
            />
          </div>
        </div>
        <hr />
        <div class='book-data-info-container'>
          <p class='justify-content-between'>
            <b>Started:</b>{" "}
            <input type="date" value={book.startDate.slice(0,10)}/>
          </p>
          <p class='justify-content-between'>
            <b>Finished:</b>{" "}
            <input type="date" value={book.finishedDate ? book.finishedDate.slice(0,10) : ""}/>
          </p>
          <p class='justify-content-between'>
            <b>Total Pages:</b> {book.totalPages}
          </p>
          <p class='justify-content-between'>
            <b>Current Page:</b> <input type="number" value={book.currentPage} style={{width: "50px"}}/>
          </p>
          <p class='justify-content-between'>
            <b>Time Taken:</b>{" "}
            <Moment from={book.startDate} to={book.finishedDate}></Moment>
          </p>
          <p class='justify-content-between'>
            <b>PPD:</b>{" "}
          </p>
          <p class='justify-content-between'>
            <b>Your Rating:</b> <span><input type="number" min="0" max="5" value={book.rating} style={{width: "50px"}}/> / 5</span>
          </p>
        </div>
        <hr />
        <div class='justify-content-center'>
          <div to='add-note' class='btn-main w-100 text-center'>
            Done
          </div>
        </div>
       
      </div>
    </div>
  );
};

EditBookData.propTypes = {
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps)(EditBookData);
