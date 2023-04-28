import { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { commentPost } from '../../redux/actions/posts';
import useStyles from './styles';
import CommentInput from './CommentInput/CommentInput';

import Comment from './Comment/Comment';

const Comments = ({comments, _id}) => {
    const dispatch = useDispatch();
    const [commentList, setcommentList] = useState([]);

    useEffect(() => {
        setcommentList(comments)
    }, [comments])

    const handlleSubmitComment = async(body) => {
        const { comments: newComments } = await dispatch(commentPost(_id, body));
        setcommentList(newComments);
    }

    const classes = useStyles();

    return (
        <div>
            <CommentInput handleCommentSubmit={handlleSubmitComment} className={classes.commentInput}/>
            {commentList.map(comment => <Comment key={comment._id} postId={_id} comment={comment} />)}
        </div>
    )
}

Comments.propTypes = {
    createdAt: PropTypes.string,
    userName: PropTypes.string,
    userImage: PropTypes.string,
    userBioName: PropTypes.string,
    body: PropTypes.string,
}

export default Comments
