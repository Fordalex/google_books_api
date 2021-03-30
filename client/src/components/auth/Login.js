import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Login = ({ counter }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      //   setAlert('Passwords do not match', 'danger');
    } else {
      //   Login({name, email, password});
    }
  };

  return (
    <Fragment>
      <div class='p-2'>
        <h1 className='text-center m-2'>Login
        </h1>
        <form className='form' onSubmit={(e) => onSubmit(e)}>
          <div className='form-group'>

            <input
              type='email'
              placeholder='Email Address'
              name='email'
              value={email}
              onChange={(e) => onChange(e)}
            />

            <input
              type='password'
              placeholder='Password'
              name='password'
              minLength='6'
              value={password}
              onChange={(e) => onChange(e)}
            />

          </div>
        <div className="justify-content-center">
          <button type='submit' className='btn-main w-100 mt-2'>Login</button>
        </div>
      
        </form>

      </div>
    </Fragment>
  );
};

Login.propTypes = {
  counter: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  counter: state.auth.counter,
});

export default connect(mapStateToProps)(Login);
