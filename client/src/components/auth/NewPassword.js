import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useParams, Redirect } from "react-router-dom";
import { createNewPassword } from "./../../actions/auth";
import { setAlert } from "../../actions/alert";

const NewPassword = ({ createNewPassword, setAlert }) => {
  const [formSubmited, setFormSubmited] = useState(false);

  const { token } = useParams();

  const onSubmit = async (e) => {
    e.preventDefault();
    const newPassword = document.getElementsByName("password")[0].value;
    const password2 = document.getElementsByName("password2")[0].value;

    if (newPassword !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      const res = await createNewPassword({ token, newPassword });
      if (res) {
        setFormSubmited(true)
      }
    }
  };

  return (
    <Fragment>
      {formSubmited ? (
        <Redirect to='/login' />
      ) : (
        <div class='form-page-container'>
          <div class='form-wrapper'>
            <h1 className='text-center m-2'>Create New Password</h1>
            <form className='form' onSubmit={(e) => onSubmit(e)}>
              <div className='form-group'>
                <input
                  type='password'
                  placeholder='New Password'
                  name='password'
                  minLength='6'
                />
                <input
                  type='password'
                  placeholder='Confirm Password'
                  name='password2'
                  minLength='6'
                />
              </div>
              <div className='justify-content-center'>
                <button type='submit' className='btn-main w-100'>
                  Done
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Fragment>
  );
};

NewPassword.propTypes = {
  createNewPassword: PropTypes.func.isRequired,
};

export default connect(null, { createNewPassword, setAlert })(NewPassword);
