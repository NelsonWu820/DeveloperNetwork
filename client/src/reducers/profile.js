import { PROFILE_GET, PROFILE_ERROR, PROFILE_CLEAR, PROFILE_UPDATE, GET_PROFILES, GET_REPOS } from "../actions/types";

const initalState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: []
}

function profileReducer(state = initalState, action){
    const {type, payload} = action;

    switch(type) {
        case PROFILE_GET:
        case PROFILE_UPDATE:
            return {
                ...state,
                profile: payload,
                loading: false
            }
        case GET_PROFILES:
            return {
                ...state,
                profiles: payload,
                laoding: false
            }
        case PROFILE_ERROR:
            return {
                ...state,
                profile: null,
                loading: false,
                error: payload
            }
        case PROFILE_CLEAR:
            return {
                ...state,
                profile: null,
                repos: [],
                loading: false
            }
        case GET_REPOS:
            return {
                ...state,
                repos: payload,
                loading: false
            }
        default:
            return state;
    }
}

export default profileReducer;