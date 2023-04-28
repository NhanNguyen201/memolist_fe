import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import CustomModal from '../../../components/CustomModal/CustomModal';
import LikeButton from '../../Posts/Post/LikeAndView/LikeListDialog/LikeButton/LikeButton';
import LikeListDialog from '../../Posts/Post/LikeAndView/LikeListDialog/LikeListDialog';
import { likeTheComment, replyTheComment } from '../../../api'
import Replies from './Replies/Replies';
import dayjs from 'dayjs';
import useStyles from './styles';
import axios from 'axios';

export default function Comment({postId, comment}) {
    const classes = useStyles();

    const { authenticated } = useSelector(state => state.auth);
    const [replies, setReplies] = useState(() => comment.replies)
    const [repliesCount, setReplyCount] = useState(() => comment.replyCount);
    const [reactions, setReactions] = useState(() => comment.reactions)
    const [isReplyOpen, setIsReplyOpen] = useState(false)
    
    const handleLikeComment = async (emoji) => {
        try {
            const { data } = await likeTheComment(postId, comment._id, {emoji: emoji});
            let theResultComment = data.comments.find(each => each._id === comment._id);
            setReactions(theResultComment.reactions)
        } catch (error) {
            console.log(error.response ? error.response.data : error)
        }
    }

    const handleReplyComment = async(body) => {
        try {
            const { data } = await replyTheComment(postId, comment._id, { body })
            let theResultComment = data.comments.find(each => each._id === comment._id);
            setReplies(theResultComment.replies)
            setReplyCount(theResultComment.replyCount)
        } catch (error) {
            console.log(error.response ? error.response.data : error)
        }
    }
    const handleOpenReply = () => setIsReplyOpen(!isReplyOpen)

    return (
        <div className={classes.comment}>
            <Avatar src={comment.userImage} style={{transform: "translateY(25%)"}}/>
            <div className={classes.commentDetail}>
                <div className={classes.commentDetailHeader}>
                    <div className={classes.commentDetailUser}>
                        <Typography variant="subtitle1" component={Link} to={`/users/${comment.userId}`} className={classes.commentDetailUserLink} color='primary'>{comment.userBioName}</Typography>
                        <Typography variant="caption">{dayjs(comment.createdAt).format('HH:mm:ss DD/MM/YYYY')}</Typography>
                    </div>
                    <div className={classes.reactionsContainer}>
                        <LikeListDialog reactions={reactions}/>
                    </div>
                </div>
                <Typography variant="body1">{comment.body}</Typography>
                <div className={classes.commentLikeAndReply}>
                    {authenticated ? (
                        <LikeButton reactions={reactions} handleSelectEmoji={handleLikeComment}/>
                    ) : (
                        <CustomModal 
                            visibleEl= {<Typography variant="body2" color="primary">Like it !</Typography>}
                            modalEl={
                                <Paper className={classes.loginPaper}>
                                    <Typography variant="body2">Please login to do this action.😝</Typography>
                                </Paper>
                            }
                        />
                    )}
                    {authenticated ? (
                        <Button variant="text" color="primary" onClick={handleOpenReply}>Reply</Button>
                    ) : (
                        <CustomModal 
                            visibleEl= {<Typography variant="body2" color="primary">Reply</Typography>}
                            modalEl={
                                <Paper className={classes.loginPaper}>
                                    <Typography variant="body2">Please login to do this action.😝</Typography>
                                </Paper>
                            }
                        />
                    )}
                    
                </div>
                {isReplyOpen && <Replies replies={replies} handleReplyComment={handleReplyComment}/>}
                {repliesCount > 0 && <Typography variant="inherit" onClick={handleOpenReply} style={{cursor: "pointer"}}>
                    {isReplyOpen ? <ArrowDropUpIcon color="primary" fontSize="large" style={{transform: "translateY(30%)"}}/> : <ArrowDropDownIcon color="primary" fontSize="large" style={{transform: "translateY(30%)"}}/>}
                    {isReplyOpen ?  " Hide " : " View "} 
                    {repliesCount} 
                    {repliesCount > 1 ? " comments": " comment"}
                </Typography>}
            </div>
        </div>
    )
}




