import { SET_USER, LOGOUT, SET_FOLLOWINGS } from '../type';
const initialState = {
    authenticated: false,
    userData: null,
    errors: null
}
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER: {
        return { 
            ...state, 
            userData: action.payload,
            authenticated: true, 
            errors: null 
        };
    }
    case SET_FOLLOWINGS: {
        return {
            ...state, 
            userData: {
                ...state.userData,
                followings: action.payload
            }
        }
    }
    case LOGOUT: {
        return initialState
    }
    default:
      return state;
  }
};

export default authReducer;