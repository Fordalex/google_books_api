import axios from "axios";

export const getBooks = ({ searchLink }) => async (dispatch) => {
  try {
    dispatch({ 
      type: "SEARCHING_BOOKS", 
    });

    const res = await axios.get(searchLink);

    dispatch({ 
        type: "SEARCHED_BOOKS", 
        payload: res.data, 
    });

  } catch (err) {
    return err;
  }
};
