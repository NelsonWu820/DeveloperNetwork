import { PROFILE_GET, PROFILE_ERROR } from "../actions/types";

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
        default:
            return state;
    }
}

export default profileReducer;