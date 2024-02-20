import { LIKE_UPDATE, POSTS_GET, POST_ERROR, DELETE_POST, ADD_POST, POST_GET, ADD_COMMENT, REMOVE_COMMENT } from "./types";
import api from '../utils/api';
import {setAlert} from './alert';

// Get posts
export const getPosts = () => async (dispatch) => {
    try {
      const res = await api.get('/posts');
  
      dispatch({
        type: POSTS_GET,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };

  // add likes
  export const addLike = (id) => async (dispatch) => {
    try {
      const res = await api.put(`/posts/like/${id}`);
  
      dispatch({
        type: LIKE_UPDATE,
        payload: {id, likes: res.data}
      });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
  
  // delete likes
  export const deleteLike = (id) => async (dispatch) => {
    try {
      const res = await api.put(`/posts/unlike/${id}`);
  
      dispatch({
        type: LIKE_UPDATE,
        payload: {id, likes: res.data}
      });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };


// Delete post
export const deletePost = (id) => async (dispatch) => {
  try {
    await api.delete(`/posts/${id}`);

    dispatch({
      type: DELETE_POST,
      payload: id
    });

    dispatch(setAlert('Post Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}

// add post
export const addPost = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/posts', formData);

    dispatch({
      type: ADD_POST,
      payload: res.data
    });

    dispatch(setAlert('Post Added', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}

// get post
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/posts/${id}`);

    dispatch({
      type: POST_GET,
      payload: res.data
    });

  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}

// add comment
export const addComment = (postId, formData) => async (dispatch) => {
  try {
    const res = await api.post(`/posts/comment/${postId}`, formData);

    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });

    dispatch(setAlert('Comment Added', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}

// delete comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await api.delete(`/posts/comment/${postId}/${commentId}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId
    });

    dispatch(setAlert('Comment Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}