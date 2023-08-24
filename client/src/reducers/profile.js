import { PROFILE_GET, PROFILE_ERROR, PROFILE_CLEAR } from "../actions/types";

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
            return {
                ...state,
                profile: payload,
                loading: false
            }
        case PROFILE_ERROR:
            return {
                ...state,
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
        default:
            return state;
    }
}

export default profileReducer;