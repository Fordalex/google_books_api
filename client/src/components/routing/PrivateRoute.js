import React, {useEffect} from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {checkUserAuthenticated} from '../../actions/auth';
import {getCurrentProfile} from '../../actions/profile';

const PrivateRoute = ({
  checkUserAuthenticated,
  getCurrentProfile,
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) => {

  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated ? (
          <Redirect to='/login' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
} 

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
  checkUserAuthenticated: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {checkUserAuthenticated, getCurrentProfile})(PrivateRoute);