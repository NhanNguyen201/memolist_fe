import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import  Grow from '@material-ui/core/Grow';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useParams, useHistory } from 'react-router-dom';
import { getUser } from '../../api'
import PostTabs from '../../components/PostTabs/PostTabs';
import { useGetUser } from '../../utils/hooks/useApiCall';
import useStyles from './styles';

const useQuery = () => new URLSearchParams(useLocation().search)

const Personal = () => {
    const history = useHistory();
    const classes = useStyles();
    const query = useQuery();
    const storyQuery = query.get('storyId');

    const { userId } = useParams();
    const [ userCurrentPosts, setUserCurrentPosts ] = useState([]);
    const { authenticated, userData: authData } = useSelector(state => state.auth);
    const { isLoading, error, userData, userPosts, currentPage, setCurrentPage, numberOfPages,  userStories } = useGetUser(userId)
    
    const loadMoreUserPosts = async () => {
        if(currentPage < numberOfPages){ 
            const { data } = await getUser(userId, currentPage + 1)
            setCurrentPage(data.posts.currentPage)
            setUserCurrentPosts([...userCurrentPosts, ...data.posts.posts])
        }
    }
    useEffect(() => {
        if(authenticated && authData.userId === userId) {
            history.push('/user')
        }
        // eslint-disable-next-line
    }, [userId, authData])

    useEffect(() => {
        if(userPosts) {
            setUserCurrentPosts(userPosts);
        }
    }, [userPosts])
    
    return (
        <Grow in>
                {isLoading ? <Container maxWidth="lg" className={classes.pageContainer}>
                    <div style={{textAlign: "center"}}><CircularProgress/></div>
                </Container>
                    :   (error  ? <Container maxWidth="lg" className={classes.pageContainer}>
                            <Typography variant="body1" style={{marginTop: 20}}>{error}</Typography>
                        </Container>
                        : <Container maxWidth="lg" className={classes.pageContainer}>
                           { userData && <div className={classes.personalInfo}>
                                <div className={classes.personalUserInfo}>
                                      <img src={userData.userImage} alt='user avatar' className={classes.userInfoImage}/>
                                     <Typography variant='h4' className={classes.userBioName} component="span">{userData.userBioName}</Typography>
                                </div>
                                {/* <Button color="secondary">Follow</Button> */}
                            </div>}
                            <PostTabs 
                                isLoading={isLoading} 
                                error={error} 
                                posts={userCurrentPosts} 
                                stories={userStories} 
                                storyOpenId={storyQuery}
                                
                                hasMore={currentPage > 0 && numberOfPages > 0 && currentPage < numberOfPages} // for infinite load
                                loadMoreUserPosts={loadMoreUserPosts} // for infinite load
                            />
                        </Container>
                )}
        </Grow>
    )
}

export default Personal
