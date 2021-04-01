import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const AddBookForm = ({ books: { books, bookIndex } }) => {
  const [formData, setFormData] = useState({
    startDate: "",
    finishedDate: "",
    currentPage: "",
  });

  const { startDate, finishedDate, currentPage } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // register({name, email, password});
  };

  const finsihedBook = (e) => {
    var finsiehdInput = document.getElementById('finishedInput');
    var pageInput = document.getElementById('pageInput');

    if (e.target.id == "yes") {
        pageInput.classList.add('hidden')
        finsiehdInput.classList.remove('hidden');
    } else {
        finsiehdInput.classList.add('hidden');
        pageInput.classList.remove('hidden');
    }
  };

  //   Check if book has title
  try {
    var title = books.items[bookIndex].volumeInfo.title;
  } catch {
    return <div></div>;
  }

  return (
    <div>
      <img
        class='info-back-button'
        src='https://img.icons8.com/ios/35/000000/circled-left-2.png'
      />
      <div class='p-2'>
        <h3 class='text-center p-1 m-0'>{title}</h3>
        <p class='text-secondary text-center mt-0'>
          Please fill out the information below.
        </p>

        <hr />

        <form className='form mt-2' onSubmit={(e) => onSubmit(e)}>
          <div className='form-group'>
            <p>Start Date</p>
            <input
              type='date'
              name='startDate'
              value={startDate}
              onChange={(e) => onChange(e)}
              required
            />
            <div class='justify-content-around align-items-center mb-2'>
              <p class='text-dark m-0'>Have you finished this book?</p>
              <div>
                Yes{" "}
                <input
                  type='radio'
                  name='reading'
                  id='yes'
                  onChange={finsihedBook}
                />
              </div>
              <div>
                No
                <input
                  type='radio'
                  name='reading'
                  id='no'
                  onChange={finsihedBook}
                />
              </div>
            </div>
            <div class="hidden" id="finishedInput">
              <p>Finished Date</p>
              <input
                type='date'
                name='finishedDate'
                value={finishedDate}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div class="hidden" id="pageInput">
              <input
                type='text'
                placeholder='Current Page'
                name='currentPage'
                value={currentPage}
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>
          <div className='justify-content-center mt-2'>
            <button type='submit' className='btn-main w-100'>
              Done
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

AddBookForm.propTypes = {
  books: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  books: state.books,
});

export default connect(mapStateToProps)(AddBookForm);
