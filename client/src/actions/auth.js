import { setAlert } from "../actions/alert";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

const stringifyObject = require("stringify-object");

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/auth/authenticated");

    dispatch({
      type: "USER_LOADED",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "AUTH_ERROR",
    });
  }
};

// Register a user
export const register = ({ firstName, lastName, email, password }) => async (
  dispatch
) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };

  const body = { firstName, lastName, email, password };

  stringifyObject(body, {
    indent: "  ",
    singleQuotes: false,
  });

  try {
    const res = await axios.post("/api/auth", body, config);

    dispatch(setAlert("User created", "success"));

    dispatch({
      type: "REGISTER_SUCCESS",
      payload: res.data,
    });

    // dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    // dispatch({
    //     type: "REGISTER_FAIL"
    // })
  }
};

// Login User
export const login = ({ email, password }) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    const body = { email, password };

    stringifyObject(body, {
      indent: "  ",
      singleQuotes: false,
    });

    const res = await axios.post("/api/auth/login", body, config);

    dispatch(setAlert("Login Successful", "success"));
    console.log(res.data);

    dispatch({
      type: "LOGIN_SUCCESS",
      payload: res.data,
    });

    loadUser();
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: "LOGIN_FAIL",
    });
  }
};

// Remove user
export const removeAccount = ({id}) => async (dispatch) => {
  if (window.confirm("Are you sure? This can't be undone!")) {
    try {

      const res = await axios.delete(`/api/auth/remove/${id}`);
  
      dispatch(setAlert("Account Removed!", "success"));
  
    } catch (err) {
        const errors = err.response.data.errors;
    
        if (errors) {
          errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }
      }
  }
}

// Send password reset
export const passwordReset = ({email}) => async (dispatch) => {
  try {

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    const body = { email };

    stringifyObject(body, {
      indent: "  ",
      singleQuotes: false,
    });

    const res = await axios.post("/api/auth/password-reset", body, config);

    dispatch(setAlert("Email Sent", "success"));

  } catch (err) {
      const errors = err.response.data.errors;
  
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
    }
}

// Create new password
export const createNewPassword = ({token, newPassword}) => async (dispatch) => {
  try {

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    const body = { token, newPassword };

    stringifyObject(body, {
      indent: "  ",
      singleQuotes: false,
    });

    const res = await axios.post("/api/auth/new-password", body, config);

    dispatch(setAlert("Your password has been changed.", "success"));

    return true;

  } catch (err) {
      const errors = err.response.data.errors;
  
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
    }
}

// Logout / Clear Profile
export const logout = () => (dispatch) => {
  dispatch({ type: "CLEAR_PROFILE" });
  dispatch({ type: "LOGOUT" });
  dispatch(setAlert("Logged Out", ""));
};

// Check if the users jwt if valid;
export const checkUserAuthenticated = () => (dispatch) => {
  dispatch({
    type: "IS_AUTHENTICATED",
  });
};
