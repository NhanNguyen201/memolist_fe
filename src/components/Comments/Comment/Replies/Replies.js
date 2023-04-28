import Reply from "./Reply/Reply"
import ReplyInput from "./ReplyInput/ReplyInput"
import { useSelector } from 'react-redux';
export default function Replies({replies, handleReplyComment}) {
    const { authenticated } = useSelector(state => state.auth)
    return (
        <>
            {authenticated && <ReplyInput handleReplyComment={handleReplyComment}/>}
            {replies.map(rep => <Reply key={rep._id} reply={rep}/>)}
        </>
    )
}
