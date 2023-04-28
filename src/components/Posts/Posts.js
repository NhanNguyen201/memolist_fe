import Post from './Post/Post';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import useStyles from './styles';
const Posts = ({isLoading, error}) => {

    const classes = useStyles();
    const { posts } = useSelector((state) => state.posts)

    return (
        isLoading ? <div className={classes.center}> <CircularProgress/> </div>
        : (error ? (<h2>{error}</h2>) 
            : (<Grid className={classes.mainContainer} container spacing={3}>
                {posts.map(post => (
                    <Grid key={post._id} item xs={12} sm={6} md={4}>
                        <Post post={post}/>
                    </Grid>
                ))}
            </Grid>)
        )  
    ) 
}

export default Posts
