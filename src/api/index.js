import axios from 'axios';

const API = axios.create({ baseURL: process.env.REACT_APP_API_BASE_URL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('memolistToken')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('memolistToken')}`;
  }
  return req;
});

// post route
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const getPost = (id) => API.get(`/posts/${id}`);
export const getAllBySearch = (searchQuery, searchTerm, page = 1) => API.get(`/search/search?q=${searchQuery}&searchTerm=${encodeURIComponent(searchTerm)}&page=${page}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const editPost = (id, newPost) => API.patch(`/posts/${id}/edit`, newPost);
export const likePost = (id, emoji) => API.patch(`/posts/${id}/like`, emoji);
export const commentPost = (id, body) => API.patch(`/posts/${id}/comment`, body);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const changePrivatePost = (id) => API.patch(`/posts/${id}/private`);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const likeTheComment = (postId, commentId, emoji) => API.patch(`/posts/${postId}/comments/${commentId}/like`, emoji)
export const replyTheComment = (postId, commentId, body) => API.patch(`/posts/${postId}/comments/${commentId}/comment`, body) 

// story route
export const createStory = (newStory) => API.post('/stories', newStory);
export const getStory = (id) => API.get(`/stories/${id}`);
export const addToStory = (id, newStory) => API.patch(`/stories/${id}/add`, newStory);
export const commentStory = (storyId, subStoryId, body) => API.patch(`/stories/${storyId}/${subStoryId}/comment`, body)
export const deleteStory = (storyId, subStoryId) => API.delete(`/stories/${storyId}/${subStoryId}`);
// user route
export const getUser = (id, page = 1) => API.get(`/users/${id}?page=${page}`);
export const followUser = (id) => API.patch(`/users/${id}/follow`);
// self route
export const getMyPosts = () => API.get('/user');
export const loginWithGoogle = () => API.get('/user/loginWithGoogle');

export const getNotifications = (page = 1) => API.get(`/user/notifications?page=${page}`);