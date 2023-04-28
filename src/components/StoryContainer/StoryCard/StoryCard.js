import { useState, useEffect, forwardRef, useRef } from 'react'
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';

import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import InstaStories, { WithSeeMore } from 'react-insta-stories';
import ChatIcon from '@material-ui/icons/Chat';
import Badge from '@material-ui/core/Badge';
import Divider from '@material-ui/core/Divider'

import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { emojify } from 'react-emojione'
import { useSelector } from 'react-redux';
import { commentStory } from '../../../api'
import timeFromNow from '../../../utils/timeFromNow';
import RoundButton from '../../../utils/RoundButton';
import Avatar from '@material-ui/core/Avatar';
import useStyle from './styles';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default function StoryCard({story, storyOpenId, handleRemoveStory}) {
    const classes = useStyle();
    const { authenticated, userData } = useSelector(state => state.auth);
    const [storyThumb, setStoryThumb] = useState('https://res.cloudinary.com/nhannhan/image/upload/v1625433124/memolist/Default_Story_bsychs.png');
    const [isStoryOpen, setIsStoryOpen] = useState(storyOpenId && storyOpenId === story._id ? true : false)
    const [stories, setStories] = useState([])
    const commentRef = useRef(null);

    const handleCloseStory = () => {
        setIsStoryOpen(false)
    }
    const handleOpenStory = () => {
        setIsStoryOpen(true)
    }
    const handleRemoveClick = (subStoryId) => {
        setIsStoryOpen(false);
        handleRemoveStory(story._id, subStoryId);
    }
    const handleChangeComment = e => {
        commentRef.current.value = e.target.value;
    }
    const handleCommentSubmit = async (subStoryId, e) => {
        e.preventDefault();
        const { data: resStory } = await commentStory(story._id, subStoryId, {body: commentRef.current.value})
        const cmtStory = resStory.stories.find(str => str._id === subStoryId)
        const newStories = stories.map(str => str._id === subStoryId ? cmtStory : str)
        setStories(newStories)
        commentRef.current.value = "";
    }
    useEffect(() => {
        let thumb = story.stories.find(str => str.image.resource_type === 'image')
        if(thumb){
            setStoryThumb(thumb.image.url)
        }
        setStories(story.stories)
    }, [story])
    return (
        <>
            <Card className={classes.storyCard} onClick={handleOpenStory}>
                <CardActionArea>
                    <CardMedia
                        alt={story.storyName}
                        title={story.storyName}
                        height={240}
                        component="img"
                        image={storyThumb}
                    />
                    <CardContent>
                        <Box style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} >
                            <Typography variant="body2" color="primary" >{emojify(story.storyName)}</Typography>
                        </Box>
                    </CardContent>
                </CardActionArea>
            </Card>

            <Dialog
                open={isStoryOpen}
                TransitionComponent={Transition}
                onClose={handleCloseStory}
                aria-labelledby={story.storyName}
            >
                <DialogContent style={{padding: 0, overflow: 'hidden'}}>
                    <Paper elevation={3}>
                        <InstaStories
                            stories={stories.map(eachStory => ({
                                url: eachStory.image.url, 
                                duration: eachStory.duration,
                                header: {
                                    heading: story.userBioName,
                                    profileImage: story.userImage,
                                    subheading: timeFromNow(eachStory.createdAt),
                                },
                                seeMoreCollapsed: ({ action, toggleMore }) => (
                                    <WithSeeMore story={eachStory} action={action}>
                                        <div style={{background:"rgba(255, 255, 255, 0.75)", padding: 5, top: "100%", marginBottom: 0, display: "flex", alignItems: "center"}} >
                                            <RoundButton 
                                                placement="top-start"
                                                tip="Comments"
                                                tipClassName={classes.editButton}
                                                onClick={() => toggleMore(true)}
                                            >
                                                <Badge
                                                    anchorOrigin={{
                                                        vertical: 'bottom',
                                                        horizontal: 'right',
                                                    }}
                                                    color="secondary"
                                                    showZero
                                                    badgeContent={eachStory.comments.length}
                                                >
                                                    <ChatIcon color="primary" fontSize="large"/>
                                                </Badge>
                                            </RoundButton>
                                            {authenticated && <form onSubmit={e => handleCommentSubmit(eachStory._id, e)} style={{width: "100%"}}>
                                                <TextField 
                                                    fullWidth 
                                                    ref={commentRef}
                                                    variant="outlined"
                                                    multiline={false}
                                                    onFocus={() => action('pause')}
                                                    onChange={handleChangeComment}
                                                />
                                            </form>}
                                        </div>
                                    </WithSeeMore>
                                ),
                                seeMore: ({ close }) => (
                                    <Grow in>
                                        <div style={{height: "100%", background: "white", padding: 20}}> 
                                            <RoundButton tip="back" onClick={close}>
                                                <ArrowBackIcon color="primary"/>
                                            </RoundButton> 
                                            <Divider variant="fullWidth"/>
                                            <div>
                                                {eachStory.comments.map(eachComment => <div className={classes.comment} key={eachComment._id}>
                                                    <Avatar src={eachComment.userImage} className={classes.commentAvatar}/>
                                                    <div>
                                                        <div>
                                                            <Typography variant="subtitle1" component={Link} to={`/users/${eachComment.userId}`} className={classes.commentDetailUserLink} color='primary'>{eachComment.userBioName}</Typography>
                                                            <Typography variant="caption">{dayjs(eachComment.createdAt).format('HH:mm:ss DD/MM/YYYY')}</Typography>
                                                        </div>
                                                        <Typography variant="body1">{eachComment.body}</Typography>
                                                    </div>
                                                </div>)}
                                            </div>
                                            {authenticated && userData.userId === story.userId && <div>
                                                <Button variant="outlined" style={{padding: 5, marginBottom: 10}} fullWidth color="primary" component={Link} to={`/stories/${story._id}/edit`}>
                                                    <AddCircleOutlineRoundedIcon fontSize="large"/>
                                                    <Typography variant="body2">
                                                        Add a new story
                                                    </Typography>
                                                </Button>
                                                <Button variant="outlined" style={{padding: 5, marginBottom: 10}} fullWidth color="secondary" onClick={() => handleRemoveClick(eachStory._id)}>
                                                    <DeleteOutlineOutlinedIcon fontSize="large"/>
                                                    <Typography variant="body2">
                                                        Delete this story
                                                    </Typography>
                                                </Button>
                                                
                                            </div>}  
                                        </div>
                                    </Grow>
                                )
                            }))}
                            onAllStoriesEnd={handleCloseStory}
                        />
                    </Paper>
                </DialogContent>
            </Dialog>
        </>
    )
}
