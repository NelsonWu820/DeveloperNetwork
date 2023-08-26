import { setAlert } from './alert';
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, PROFILE_CLEAR } from './types';
import api from '../utils/api';

//Load User
export const loadUser = () => async dispatch => {

    try {
        const res = await api.get('/auth');

        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}

//register a user
export const register = (formData) => async dispatch => {

    try {
        const res = await api.post('/users', formData);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })

        dispatch(loadUser());
    } catch (err) {
        console.log("this is error", err);
        const errors = err.response.data.errors;
        
        if(errors){
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: REGISTER_FAIL
        });
    }
}

//Login a user very similar to register a user
export const login = (email, password) => async dispatch => {
    const body = {email, password}
    try {
        const res = await api.post('/auth', body);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());
    } catch (err) {
        console.log("this is error", err);
        const errors = err.response.data.errors;
        
        if(errors){
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: LOGIN_FAIL
        });
    }
}

//LOGOUT/ claer profile
export const logout = () => dispatch => {
    dispatch({ type: PROFILE_CLEAR});
    dispatch({ type: LOGOUT});
}