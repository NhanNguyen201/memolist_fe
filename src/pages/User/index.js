import { Container, Typography, Grow } from '@material-ui/core';
import { useGetMyPosts } from '../../utils/hooks/useApiCall';
import PostTabs from '../../components/PostTabs/PostTabs';
import { useSelector } from 'react-redux';
import useStyles from './styles';
const User = () => {
    const classes = useStyles();
    const { isLoading, error, posts, stories } = useGetMyPosts();
    const { userData } = useSelector(state => state.auth);

    return (
        <Grow in>
          <Container className={classes.pageContainer}>
            <div className={classes.userInfo}>
              <img src={userData.userImage} alt='user avatar' className={classes.userInfoImage}/>
              <Typography variant='h4' className={classes.userBioName}>{userData.userBioName}</Typography>
            </div> 
            <PostTabs isLoading={isLoading} error={error} posts={posts} stories={stories}/>
          </Container>
        </Grow>
    )
}

export default User
