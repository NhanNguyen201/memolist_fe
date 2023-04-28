import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CustomModal from './../../../CustomModal/CustomModal';
import Paper from '@material-ui/core/Paper'
import VisibilityIcon from '@material-ui/icons/Visibility';
import { likePost } from '../../../../redux/actions/posts';
import LikeListDialog from './LikeListDialog/LikeListDialog';
import LikeButton from './LikeListDialog/LikeButton/LikeButton';
import useStyles from './styles';
const LikeAndComment = ({post: {_id, reactions, commentCount}, handleLike}) => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const { authenticated } = useSelector(state => state.auth);
    
    const handleLikePost = (emoji) => {
        if(handleLike) {
            handleLike(_id, emoji);
        } else {
            authenticated ? dispatch(likePost(_id, {emoji: emoji})) : history.push('/auth');
        }
    }
   
    return (
        <div className={classes.likeDetail}>
            <div className={classes.likeDetailContainer}>
                <LikeListDialog reactions={reactions}/>
                <Typography variant="body2">{commentCount} {commentCount > 1 ? 'comments' : 'comment'}</Typography>
            </div>
            <hr/>
            <div className={classes.likeActionContainer}>
                {authenticated ? (
                    <LikeButton handleSelectEmoji={handleLikePost} reactions={reactions}/>
                ) : (
                    <CustomModal 
                        isBorder={false}
                        visibleEl={
                            <Typography variant="body2" color="primary">Like it!</Typography>
                        }
                        modalEl={
                            <Paper className={classes.loginPaper}>
                                <Typography variant="body2">Please login to do this action.😝</Typography>
                            </Paper>
                        }
                    />
                )}
                <Button variant="text" component={Link} to={`/posts/${_id}`}>
                    <VisibilityIcon color="primary"/>
                    <Typography variant="body2" color="primary">View</Typography>
                </Button>
            </div>
        </div>
    )
}

export default LikeAndComment
