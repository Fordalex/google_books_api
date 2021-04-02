import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../../actions/auth";
import {setAlert} from '../../actions/alert';

const Register = ({ register, auth, setAlert }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password2: "",
  });

  const { firstName, lastName, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
        setAlert('Passwords do not match','danger');
    } else {
        register({firstName, lastName, email, password});
    }
  };

  return (
    <Fragment>
      {auth.isAuthenticated ? (
        <Redirect to="profile"/>
      ): (
        <div class='p-2'>
        <h1 className='text-center m-2'>Create Your Account
        </h1>
        <form className='form' onSubmit={(e) => onSubmit(e)}>
          <div className='form-group'>
        
            <input
              type='text'
              placeholder='First Name'
              name='firstName'
              value={firstName}
              onChange={(e) => onChange(e)}
              required
            />
            <input
              type='text'
              placeholder='Last Name'
              name='lastName'
              value={lastName}
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
        <Link className='btn-secondary w-100 ml-1' to='login'>Sign In</Link>
        </div>
        </form>
      </div>
      )}
     
    </Fragment>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth
})


export default connect(mapStateToProps, {setAlert, register})(Register);
