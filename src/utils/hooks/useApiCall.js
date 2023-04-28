import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { UPDATE, FETCH_ALL } from '../../redux/type';
import * as api from '../../api';

export const useGetPost = (id) => {
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [result, setResult] = useState(null)
    useEffect(() => {
        setLoading(true);
        api.getPost(id)
            .then(res => {
                setResult(res.data);
                dispatch({
                    type: UPDATE,
                    payload: res.data
                })
            })
            .catch(err => {
                setError(err.response.data.error)
            })
            .finally(() => setLoading(false))
        // eslint-disable-next-line
    }, [id])
    return { isLoading, error, result }
}

export const useSearchAll = (searchQuery, urlSearchQuery, searchTerm, urlSearchTerm) => {
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [result, setResult] = useState({})
    const history = useHistory();
    useEffect(() => {        
        setLoading(true);
        if(urlSearchTerm !== searchTerm || searchQuery !== urlSearchQuery){
            history.push(`/search?q=${searchQuery}&term=${encodeURIComponent(urlSearchTerm)}`)
        } 
        api.getAllBySearch(searchQuery, urlSearchTerm)
            .then(res => {
                setResult(res.data)
            })  
            .catch(error => {
                setError(error?.response.data.error || "something wrong")
            })
            .finally(() => {
                setLoading(false)
            })
    }, [searchQuery, urlSearchQuery, searchTerm, urlSearchTerm, history])
    return { result, isLoading, error }
}

export const useGetAllPosts = (page) => {
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    useEffect(() => {
        setLoading(true)
        api.fetchPosts(page)
            .then(res => {
                dispatch({
                    type: FETCH_ALL,
                    payload: res?.data
                })
            })
            .catch(err => {
                if(error?.response.data.error) {
                    setError(err?.response.data.error)
                } else {
                    setError('Something is wrong')
                }
            })
            .finally(() => setLoading(false))
        
        // eslint-disable-next-line
    }, [dispatch, page])
    return { isLoading, error };
}
export const useGetMyPosts = () => {
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [posts, setPosts] = useState([])
    const [stories, setStories] = useState([])
    useEffect(() => {
        setLoading(true)
        api.getMyPosts()
            .then(res => {
                setPosts(res.data.posts)
                setStories(res.data.stories)
            })
            .catch(err => {
                if(err?.response.data.error) {
                    setError(err?.response.data.error)
                } else {
                    setError('Something is wrong')
                }
            })
            .finally(() => setLoading(false))
        // eslint-disable-next-line
    },[])
    return {isLoading, error, posts, stories};
}

export const useGetUser = (id) => {
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [userData, setUserData] = useState(null)
    const [userPosts, setUserPosts] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState(1);
    const [userStories, setUserStories] = useState([])
    useEffect(() => {
        api.getUser(id, currentPage)
            .then(res => {
                setUserData(res.data.userData)
                setUserPosts(res.data.posts.posts)
                setCurrentPage(res.data.posts.currentPage)
                setNumberOfPages(res.data.posts.numberOfPages)
                setUserStories(res.data.stories)
            })
            .catch(error => {
                if(error.response) {
                    setError(error.response.data.error)
                } else {
                    setError('Something is wrong')
                }
            })
            .finally(() => setLoading(false))
        // eslint-disable-next-line
    }, [id])
    return { isLoading, error, userData, userPosts, setUserPosts, currentPage, setCurrentPage, numberOfPages, userStories }
}
// not need
export const changePrivacy = async(id) => {
    try {
        const { data } = await api.changePrivatePost(id)
        return data
    } catch (error) {
        console.log(error);        
    }
}

export const likeTheComment = async (postId, commentId) => {
    try {
        const { data } = api.likeTheComment(postId, commentId)
        return data;
    } catch (error) {
        console.log(error)
    }
}

export const replyTheComment = async (postId, commentId, body) => {
    try {
        const { data } = api.replyTheComment(postId,commentId,body)
        return data;
    } catch (error) {
        console.log(error);
    }
}