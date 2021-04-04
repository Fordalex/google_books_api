import React from "react";
import {getBooks} from '../../actions/books';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const Form = ({ getBooks }) => {

  const searchBookHandler = async (e) => {
    e.preventDefault();
    const srch = document.getElementById("searchInput").value;
    getBooks({srch});
  };


  return (
    <form onSubmit={searchBookHandler} id='bookForm' class="mt-3">
      <img src='https://img.icons8.com/ios-glyphs/30/000000/search.png' />
      <input type='text' id='searchInput' placeholder='Search...' autoComplete="off"/>
      <button>Search</button>
    </form>
  );
};

Form.propTypes = {
  getBooks: PropTypes.func.isRequired,
}

export default connect(null, {getBooks})(Form);