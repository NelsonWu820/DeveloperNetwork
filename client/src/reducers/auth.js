import { USER_LOADED, AUTH_ERROR, REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, ACCOUNT_DELETE } from "../actions/types";

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
}

function authReducer(state = initialState, action) {
    const { type, payload } = action;
    switch(type){
        case USER_LOADED:
            return {
              ...state,
              isAuthenticated: true,
              loading: false,
              user: payload
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            };  
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case ACCOUNT_DELETE:
        case LOGOUT:
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null
            };  
        default:
            return state;
    }
}

export default authReducer;