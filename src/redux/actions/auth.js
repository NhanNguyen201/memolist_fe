import { SET_USER, SET_FOLLOWINGS, LOGOUT } from '../type';
import setStorage from '../../utils/setStorage';
export const setAuth = (user) => dispatch => {
    dispatch({
        type: SET_USER,
        payload: user
    })
    localStorage.setItem('profile', JSON.stringify(user))
}

export const setToken = token => {
    localStorage.setItem('memolistToken', token);
}

export const clearToken = () => localStorage.clear()

export const setFollowings = followings => dispatch => {
    dispatch({
        type: SET_FOLLOWINGS,
        payload: followings
    })
    setStorage('profile', 'followings', followings)
}
export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    })
    clearToken();
}