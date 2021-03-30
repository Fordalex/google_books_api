import {setAlert} from '../actions/alert'
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
const stringifyObject = require('stringify-object');

// Load User
export const register = ({name, email, password}) => async dispatch  => {

    const config = {
        header: {
            'Content-Type': 'application/json'
        }
    };

    const body = { name, email, password };

    stringifyObject(body, {
        indent: '  ',
        singleQuotes: false
    })

    try {
        const res = await axios.post('/api/users', body, config);

        dispatch(setAlert("User created", 'success'))

        dispatch({
            type: "REGISTER_SUCCESS",
            payload: res.data
        })

        // dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }

        // dispatch({
        //     type: "REGISTER_FAIL"
        // })
    }

}