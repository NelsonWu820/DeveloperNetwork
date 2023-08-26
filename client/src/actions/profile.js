import { PROFILE_GET, PROFILE_ERROR, PROFILE_UPDATE } from "./types";
import api from "../utils/api";
import { setAlert } from "./alert";

export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await api.get('/profile/me');

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

// Add Experience
export const addExperience = (formData) => async (dispatch) => {
  try {
    const res = await api.put('/profile/experience', formData);

    dispatch({
      type: PROFILE_UPDATE,
      payload: res.data
    });

    dispatch(setAlert('Experience Added', 'success'));
    return res.data;
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

//Add Education
export const addEducation = (formData) => async (dispatch) => {
  try {
    const res = await api.put('/profile/education', formData);

    dispatch({
      type: PROFILE_UPDATE,
      payload: res.data
    });

    dispatch(setAlert('Education Added', 'success'));
    return res.data;
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