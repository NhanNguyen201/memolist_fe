import * as api from '../../api';
import { FETCH_ALL, CREATE, UPDATE, DELETE, START_POSTING, FINISH_POSTING, POSTING_ERROR, RESET_POSTING_STATE } from '../type'

export const getPostsByPage = page => async(dispatch) => {
    try {
        const { data } = await api.fetchPosts(page)
        dispatch({
            type: FETCH_ALL,
            payload: data
        })
    } catch (error) {
        console.log(error)
    }
}

export const createPost = (post) => async(dispatch) => {
    console.log(post);
    dispatch({ type: START_POSTING })
    try {
        const { data } = await api.createPost(post);
        dispatch({ type: FINISH_POSTING })
        dispatch({
            type: CREATE,
            payload: data
        })
        setTimeout(() => {
            dispatch({type: RESET_POSTING_STATE})
        }, 3000)
    } catch (error) {
        dispatch({ type: POSTING_ERROR })
        console.log(error)
    }
}

export const likePost = (id, emoji) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id, emoji);
        dispatch({
            type: UPDATE,
            payload: data
        })
    } catch (error) {
        console.log(error);        
    }
}

export const commentPost = (id, body) => async(dispatch) => {
    try {
        const { data } = await api.commentPost(id, body)
        dispatch({
            type: UPDATE,
            payload: data
        })
        return data;
    } catch (error) {
        console.log(error);        
    }
}

export const deletePost = (id) => async(dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({
            type: DELETE,
            payload: id
        })
    } catch (error) {
        console.log(error)
    }
}

