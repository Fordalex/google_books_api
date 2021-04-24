import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {passwordReset} from './../../actions/auth'

const PasswordReset = ({passwordReset}) => {

    const onSubmit = (e) => {
        e.preventDefault();
        const email = document.getElementsByName('email')[0].value;
        passwordReset({email})
    }

    return (
        <div class='form-page-container'>
          <div class='form-wrapper'>
            <h1 className='text-center m-2'>Password Reset</h1>
            <form className='form' onSubmit={(e) => onSubmit(e)}>
              <div className='form-group'>
                <input
                  type='email'
                  placeholder='Email Address'
                  name='email'
                  className="input-style"
                />
              </div>
              <div className='justify-content-center'>
                <button type='submit' className='btn-main w-100'>
                  Send Email
                </button>
              </div>
            </form>
          </div>
        </div>
    )
}

PasswordReset.propTypes = {
    passwordReset: PropTypes.func.isRequired,
}

export default connect(null, {passwordReset})(PasswordReset);
