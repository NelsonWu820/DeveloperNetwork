import { POSTS_GET, POST_ERROR, LIKE_UPDATE, DELETE_POST, ADD_POST, POST_GET, ADD_COMMENT, REMOVE_COMMENT } from "../actions/types";

const initialState = {
    posts: [],
    post: null,
    loading: true,
    error: {}
}

function postReducer (state = initialState, action) {
    const { type, payload} = action
    switch(type){
        case POSTS_GET:
            return {
                ...state,
                posts: payload,
                loading: false
            }
        case POST_GET: 
            return {
                ...state,
                post: payload,
                loading: false
            }
        case POST_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case ADD_POST:
            return{
                ...state,
                posts: [...state.posts, payload],
                loading: false
            }
        case DELETE_POST:
            return{
                ...state,
                posts: state.posts.filter((post) => post._id !== payload),
                loading: false
            }
        case LIKE_UPDATE:
            return {
                ...state,
                posts: state.posts.map((post) => post._id === payload.id ? {...post, likes: payload.likes}: post),
                loading: false
            }
        case ADD_COMMENT:
            return {
                ...state,
                post: { ...state.post, comments: payload},
                loading: false
            }
        case REMOVE_COMMENT:
            return {
                ...state,
                post: { ...state.post, comments: state.post.comment.filter(comment => comment._id !== payload)},
                loading: false
            }
        default:
            return state
    }
}

export default postReducer;