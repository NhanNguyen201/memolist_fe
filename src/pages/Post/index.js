import { Container, Grid, Grow, Paper, Typography, Avatar, Chip } from '@material-ui/core';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { likePost } from '../../api'
import dayjs from 'dayjs';
import Gallery from '../../components/Gallery/Gallery';
import { useGetPost } from '../../utils/hooks/useApiCall';

import Comments from '../../components/Comments/Comments';
import CustomModal from '../../components/CustomModal/CustomModal';
import LikeListDialog from '../../components/Posts/Post/LikeAndView/LikeListDialog/LikeListDialog';
import LikeButton from '../../components/Posts/Post/LikeAndView/LikeListDialog/LikeButton/LikeButton';
import useStyles from './styles';

const PostPage = () => {
    const { postId } = useParams();
    const classes = useStyles();
    const [post, setPost] = useState({})
    const { isLoading, error, result } = useGetPost(postId);
    const { authenticated } = useSelector(state => state.auth);
    const [mediaImage, setMediaImage] = useState('https://res.cloudinary.com/nhannhan/image/upload/v1612679060/memolist/Memolist_a6ulh7.png');
    
    useEffect(() => {
        if(result) {
            setPost(result);
            const newMediaImage = result.selectedFiles.find(file => file.resource_type === 'image')
            if(newMediaImage) {
                setMediaImage(newMediaImage.url)
            }
        }
    }, [result])



    const handleLike = async(emoji) => {
        try {
            if(authenticated){
                const { data :newPost } = await likePost(post._id, {emoji: emoji})
                if(newPost) setPost(newPost)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return isLoading ? (
        <Container maxWidth="lg">
            <p>Loading..</p>
        </Container>    
    ) : (
        error ? (
            <Container maxWidth="lg">
                <Typography variant="body1">{error}</Typography> 
            </Container>
        ): (result && post && <Grow in className={classes.pageContainer}>
            <Container maxWidth="lg">
                <Grid container spacing={4} className={classes.mainContainer}>
                    <Grid item xs={12} md={4} className={classes.mediaImageGrid}>
                        <Paper variant="outlined">
                            <img src={mediaImage} alt={post.title} className={classes.mediaImage}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <div className={classes.titleDiv}>
                            <Typography variant="h4">{post.title}</Typography>
                        </div>
                        <div className={classes.avatarGroup}>
                            <Avatar src={post.userImage} className={classes.userImage}/>
                            <div className={classes.avatarGroupDetail}>
                                <Typography variant="subtitle1" className={classes.userBioName} component={Link} to={`/users/${post.userId}`} color='primary'>{post.userBioName}</Typography>
                                <Typography variant="body2">{dayjs(post.createdAt).format('HH:mm:ss DD/MM/YYYY')}</Typography>
                            </div>
                        </div>
                        <div className={classes.tagChipContainer}>
                            {post.tags.map((tag, index) => 
                                <Chip 
                                    label={`#${tag}`} 
                                    key={index}
                                    variant="outlined" 
                                    color='secondary' 
                                    size="medium"
                                    clickable
                                    component={Link}
                                    to={`/search?q=top&term=${encodeURIComponent(`#${tag}`)}`}
                                    className={classes.tagChip}
                                />
                            )}
                        </div>
                        <Typography variant="body2" style={{marginBottom: 20, textIndent: "10px"}}>{post.message}</Typography>
                        <LikeListDialog reactions={post.reactions}/>
                        <div className={classes.likeContainer}>
                            {authenticated ? (
                                <LikeButton reactions={post.reactions}  handleSelectEmoji={handleLike} outlined={true}/>
                            ) : (
                                <CustomModal 
                                    isBorder={true}
                                    visibleEl={
                                        <Typography variant="body2" color="primary">Like it !</Typography>
                                    }
                                    modalEl={
                                        <Paper className={classes.loginPaper}>
                                            <Typography variant="body2">Please login to do this action.😝</Typography>
                                        </Paper>
                                    }
                                />
                            )}
                        </div>
                    </Grid>
                </Grid>
                <Grid container spacing={1}>
                    <Grid  item xs={12}>
                        <Gallery selectedFiles={post.selectedFiles}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Comments comments={post.comments} _id={post._id}/>     
                    </Grid>
                </Grid>
            </Container>
        </Grow>)
    )     
}

export default PostPage

