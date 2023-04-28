import PropTypes from 'prop-types'
import { useState } from 'react';
import TextField from '@material-ui/core/TextField'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { useSelector } from 'react-redux'
import GoogleButton from '../../GoogleBtn/GoogleButton';

import useStyles from './styles'
const CommentInput = ({ handleCommentSubmit }) => {
    const classes = useStyles();
    const { authenticated, userData } = useSelector(state => state.auth)
    const [body, setBody] = useState('')
    const handleSubmit = () => {
        if(body !== "") handleCommentSubmit({body})
        setBody('');
    }
    return (
        authenticated ? (
            <div className={classes.commentInput}>
                <Avatar src={userData.userImage} className={classes.commentAvatar}/>
                <div className={classes.input}>
                    <TextField
                        name="body"
                        type="text"
                        label="Comment field"
                        multiline
                        placeholder="Leave a comment"
                        value={body}
                        onChange={e => setBody(e.target.value)}
                        fullWidth
                    />
                    <Button onClick={handleSubmit} className={classes.submitBtn} variant="contained" color="primary">Submit</Button>
                </div>
            </div>
        ) : (       
            <Grid container justifyContent='center' className={classes.signinGrid}>
                <Grid item xs={6} md={3}>
                    <Paper elevation={2} className={classes.signinPaper}>
                        <GoogleButton/>
                    </Paper>
                </Grid>
            </Grid>
        )
    )
}

CommentInput.propTypes = {
    handleCommentSubmit: PropTypes.func
}

export default CommentInput
