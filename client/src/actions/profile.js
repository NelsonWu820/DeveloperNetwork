import { PROFILE_GET, PROFILE_ERROR, PROFILE_UPDATE, ACCOUNT_DELETE, PROFILE_CLEAR, GET_PROFILES, GET_REPOS } from "./types";
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

  //get all profiles
export const getAllProfiles = () => async (dispatch) => {
  dispatch({ type: PROFILE_CLEAR})
    try {
      const res = await api.get('/profile');

      dispatch({
        type: GET_PROFILES,
        payload: res.data
      });

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

//get profile by id
export const getProfileById = (userId) => async (dispatch) => {
    try {
      const res = await api.get(`/profile/${userId}`);

      dispatch({
        type: PROFILE_GET,
        payload: res.data
      });

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

//get Github repos
export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const res = await api.get(`/profile/github/${username}`);

    dispatch({
      type: GET_REPOS,
      payload: res.data
    });

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

//delete Experience 
export const deleteExperience = id => async dispatch => {
  try {
    const res = await api.delete(`/profile/experience/${id}`);

    dispatch({
      type: PROFILE_UPDATE,
      payload: res.data
    })

    dispatch(setAlert('Experience Deleted', 'success'));
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
}

//delete Experience 
export const deleteEducation = id => async dispatch => {
  try {
    const res = await api.delete(`/profile/education/${id}`);

    dispatch({
      type: PROFILE_UPDATE,
      payload: res.data
    })

    dispatch(setAlert('Education Deleted', 'success'));
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
}

//Delete account & profile
export const deleteAccount = id => async dispatch => {
  if(window.confirm("Are you sure? This action can NOT be undone")){
    try {
      await api.delete('/profile');
  
      dispatch({PROFILE_CLEAR})
      dispatch({
        type: ACCOUNT_DELETE
      })

  
      dispatch(setAlert('Account Deleted'));
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
  }
}