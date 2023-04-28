import { combineReducers } from 'redux';

import posts from './posts';
import auth from './auth';
import doPosting from './doPosting';
export default combineReducers({
    posts,
    auth,
    doPosting
})