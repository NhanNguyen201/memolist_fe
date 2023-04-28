import { useState, useEffect, useCallback } from 'react';
import PostPaper from "../PostPaper/PostPaper"
import { Paper, Typography, Button } from '@material-ui/core';
import { getAllBySearch } from '../../../api'
import useStyles from './styles';

const PostContainer = ({posts: {posts: postListInitial, currentPage, numberOfPages}, searchTerm}) => {
    const [currentPostPage, setCurrentPostPage] = useState(() => currentPage);
    const [nextPage, setNextPage] = useState(() => (numberOfPages > 0 && currentPage < numberOfPages) ? currentPage + 1 : 0);
    const [postList, setPostList] = useState(() => postListInitial)
    
    const loadMore = useCallback(async() => {
        const { data } = await getAllBySearch('posts', searchTerm, nextPage)
        setPostList(prevState => [...prevState, ...data.posts.posts])
        setCurrentPostPage(data.posts.currentPage)
    }, [nextPage, searchTerm])

    useEffect(() => {
        if(numberOfPages > 0 && currentPostPage < numberOfPages){
            setNextPage(currentPostPage + 1);
        }
    }, [currentPostPage, numberOfPages])
    const classes = useStyles()

    return (
        <Paper variant="outlined" square className={classes.postContainerPaper}>
            <Typography variant="h5">Posts you may find: </Typography>
            {postList.map(post => <PostPaper post={post} key={post._id}/>)}
            {(numberOfPages > 0 && currentPostPage < numberOfPages) && (
                <div className={classes.loadMoreButton}>
                    <Button variant="outlined" onClick={loadMore}>Load more</Button>
                </div>
            )}
        </Paper>
    )
}

export default PostContainer
