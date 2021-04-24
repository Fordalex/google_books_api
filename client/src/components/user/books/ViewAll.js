import React, { Fragment, useEffect, useState } from "react";
import BookMedium from "./BookMedium";
import BookSmall from "./BookSmall";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import anime from "animejs/lib/anime.es.js";

const Books = ({
  profile: {
    profile: { user, books },
    loading,
  },
}) => {
  const [view, setView] = useState("small");
  const [filterCategory, setFilterCategory] = useState("Science");
  const [filterReadingStatus, setFilterReadingStatus] = useState("all");

  useEffect(() => {
    anime({
      targets: ".book-container",
      keyframes: [
        { rotate: "-80deg", translateX: "-100vw", duration: 0 },
        { rotate: "0deg", translateX: "0px", duration: 800 },
      ],
      opacity: 1,
      delay: anime.stagger(100, { easing: "easeOutQuad" }),
    });
    anime({
      targets: ".book-img-container",
      keyframes: [
        { rotate: "180deg", duration: 0 },
        { rotate: "0deg", duration: 1500 },
      ],
      opacity: 1,
      delay: anime.stagger(100, { easing: "easeOutQuad" }),
    });
  }, []);

  try {
    // Sort catgories ready for table and pie chart
    var categoriesArr = books.map((book) => book.categories);
    var categories = [];
    categoriesArr.map((cats) => cats.map((cat) => categories.push(cat)));
    var allCategories = {};
    categories.forEach((cat) => {
      allCategories[cat] = (allCategories[cat] || 0) + 1;
    });
  } catch (err) {
    var allCategories = [];
  }

  // filter out the categories searched by the user.
  var books = books.filter((book) => {
    if (book.categories.includes(filterCategory) || filterCategory == 'all') {
      return book
    }
  })

  // Filter the books the user has and hasn't read.
  try {
    // Filter the books the user is reading
    var reading = books.filter((book) =>
      book.readingStatus == "reading" ? book : null
    );
  } catch (err) {
    var reading = [];
  }
  try {
    // filter the books the user has read
    var read = books.filter((book) =>
      book.readingStatus == "read" ? book : null
    );
  } catch (err) {
    var read = [];
  }
  try {
    // filter the books that the users hasn't completed
    var uncompleted = books.filter((book) =>
      book.readingStatus == "uncompleted" ? book : null
    );
  } catch (err) {
    var uncompleted = [];
  }

  const bookSizeHandler = (e) => {
    setView(e.target.value);
  };

  const filterCategoryHandler = (e) => {
    setFilterCategory(e.target.value)
  }


  return (
    <Fragment>
      <div class='p-1 form-group'>
        <p>View Size</p>
        <select class='input-style' onChange={(e) => bookSizeHandler(e)}>
          <option value='small'>Small</option>
          <option value='medium'>Medium</option>
        </select>
      </div>
      <div class='p-1 form-group'>
        <p>Category</p>
        <select class='input-style' onChange={(e) => filterCategoryHandler(e)}>
          <option value="all">All</option>
          {Object.entries(allCategories).map((cat) => {
            return <option value={cat[0]}>{cat[0]} - {cat[1]}</option>
          })}
        </select>
      </div>
      <hr />
      <h2 class='p-2 m-0'>Reading</h2>
      {view == "medium"
        ? reading.map((book, index) => (
            <BookMedium book={book} key={index} index={index} />
          ))
        : reading.map((book, index) => (
            <BookSmall book={book} key={index} index={index} />
          ))}
      <p class='m-1'>Results: {reading.length}</p>
      <hr />
      <h2 class='p-2 m-0'>Read</h2>
      {view == "medium"
        ? read.map((book, index) => (
            <BookMedium book={book} key={index} index={index} />
          ))
        : read.map((book, index) => (
            <BookSmall book={book} key={index} index={index} />
          ))}
      <p class='m-1'>Results: {read.length}</p>
      <hr />
      <h2 class='p-2 m-0'>Uncompleted</h2>
      {view == "medium"
        ? uncompleted.map((book, index) => (
            <BookMedium book={book} key={index} index={index} />
          ))
        : uncompleted.map((book, index) => (
            <BookSmall book={book} key={index} index={index} />
          ))}
      <p class='m-1'>Results: {uncompleted.length}</p>
    </Fragment>
  );
};

Books.propTypes = {
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps)(Books);
