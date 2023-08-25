import { PROFILE_GET, PROFILE_ERROR } from "./types";
import api from "../utils/api";
import { setAlert } from "./alert";

export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await api.get('/api/profile/me');

        dispatch({
            type: PROFILE_GET,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

// Create or update profile
export const createProfile = (formData, edit = false) => async (dispatch) => {
    try {
      const res = await api.post('/profile', formData);

      dispatch({
        type: PROFILE_GET,
        payload: res.data
      });

      dispatch(
        setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success')
      );

    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };