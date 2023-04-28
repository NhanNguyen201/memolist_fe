// import RoundButton from "../../../../../utils/RoundButton";
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

// import Button from '@material-ui/core/Button';
import useStyle from './style';

export default function Reply({reply}) {
    const classes = useStyle()
    return (
        <div className={classes.reply}>
            <Avatar src={reply.userImage} style={{transform: "translateY(25%)"}} />
            <div className={classes.replyDetail}>
                <div className={classes.replyDetailUser}>
                    <Typography variant="subtitle1" component={Link} to={`/users/${reply.userId}`} className={classes.replyDetailUserLink} color='primary'>{reply.userBioName}</Typography>
                    <Typography variant="caption">{dayjs(reply.createdAt).format('HH:mm:ss DD/MM/YYYY')}</Typography>
                </div>
                <Typography variant="body1">{reply.body}</Typography>
                {/* <div className={classes.commentLikeAndReply}>
                    <Button variant="text" className={classes.likeCommentButton} color="primary" onClick={handleOpenReply}>Reply</Button>
                </div> */}
            </div>
        </div>
    )
}
