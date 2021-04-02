import axios from 'axios';
import {setAlert} from '../actions/alert'

export const saveNote = ({noteInfo, noteType, pageNumber, note, bookId}) => async dispatch => {
    try {

        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        };
    
        const body = { noteInfo, noteType, pageNumber, note, bookId };
        const res = await axios.post('api/books/add-note', body, config)

        dispatch(setAlert(`Note added to ${res.data.title}`, "success"))

    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
          errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }
      }
}