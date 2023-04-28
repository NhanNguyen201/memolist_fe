import { useState } from 'react'
import { useSelector } from 'react-redux'
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import RoundButton from '../../../../../utils/RoundButton';
import SendIcon from '@material-ui/icons/Send';
import useStyle from './style'

export default function ReplyInput({handleReplyComment}) {
    const [body, setBody] = useState('')
    const { userData } = useSelector(state => state.auth)    
    const handleSubmit = e => {
        e.preventDefault();
        handleReplyComment(body);
        setBody("")
    }
    const classes = useStyle()
    return (
        <form className={classes.replyInput} onSubmit={handleSubmit}>
            <Avatar src={userData.userImage} className={classes.replyAvatar}/>
            <div className={classes.input}>
                <TextField
                    name="body"
                    type="text"
                    label="Comment field"
                    placeholder="Leave a comment"
                    value={body}
                    onChange={e => setBody(e.target.value)}
                    fullWidth
                />
            </div>
            <RoundButton tip="submit" onClick={handleSubmit}>
                <SendIcon color="primary" fontSize="large"/>
            </RoundButton>
        </form>
    )
}
