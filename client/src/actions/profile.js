import axios from 'axios';

// Get current users profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me');
        console.log(res.data)
        dispatch({
            type: "GET_PROFILE",
            payload: res.data
        })
    } catch (err) {
        dispatch({ 
            type: "PROFILE_ERROR",
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

export const addBookId = (id) => async (dispatch) => {
    dispatch({
      type: "BOOK_ID",
      payload: id,
    });
  };
  