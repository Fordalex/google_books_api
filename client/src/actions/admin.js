import axios from "axios";
import {setAlert} from './alert'

// Get the admin data
export const getAdminData = () => async dispatch => {
  
    try {
      const res = await axios.get("/api/admin");

      dispatch({
        type: "SET_ADMIN_DATA",
        payload: res.data,
      })
  
      return res
      
    } catch (err) {
        dispatch(setAlert("Getting data for admin error (action)", "danger"));
    }
  };