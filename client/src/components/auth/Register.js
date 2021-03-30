import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { auth } from "../../actions/auth";

const Register = ({ auth, counter }) => {
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
      //   register({name, email, password});
    }
  };

  return (
    <Fragment>
      <div class='p-2'>
        <h1 className='text-center m-2'>Create Your Account
        </h1>
        <form className='form' onSubmit={(e) => onSubmit(e)}>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Name'
              name='name'
              value={name}
              onChange={(e) => onChange(e)}
              required
            />

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

            <input
              type='password'
              placeholder='Confirm Password'
              name='password2'
              minLength='6'
              value={password2}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div class="d-flex-center m-1">
            <input type="checkbox" class="m-1"/>
            <p>I agree to the <span class="text-main">Terms</span> and <span class="text-main">Privacy Policy</span>.</p>
          </div>
        <div className="justify-content-center">
          <button type='submit' className='btn-main w-100'>Register</button>
        <button className='btn-secondary w-100 ml-1'>Sign In</button>
        </div>
      
        </form>

      </div>
    </Fragment>
  );
};

Register.propTypes = {
  counter: PropTypes.number.isRequired,
  auth: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  counter: state.auth.counter,
});

export default connect(mapStateToProps, { auth })(Register);
