import { FETCH_ALL, UPDATE, CREATE, DELETE, SEARCH } from '../type'

const initialState = {
    posts: [],
    currentPage: 1,
    numberOfPages: 1
}
// eslint-disable-next-line
export default (state = initialState, action) => {
    switch(action.type) {
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.posts,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            }
        case CREATE:
            return {
                ...state,
                posts: [ action.payload, ...state.posts ]
            }
        case SEARCH: {
            return {
                ...state,
                posts: action.payload.posts,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            }
        }
        case UPDATE: {
            if(state.posts.find(post => post._id === action.payload._id)){
                return {
                    ...state,
                    posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post)
                }
            } else return state;
        }
        case DELETE:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== action.payload)  
            }
            
        default:
            return state
    }
}