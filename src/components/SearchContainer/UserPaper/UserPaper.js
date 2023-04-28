import { Paper, Avatar, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom';
import useStyle from './styles'

const UserPaper = ({user}) => {
    const classes = useStyle();
    return (
        <Paper className={classes.userPaper} elevation={3}>
            <Avatar src={user.userImage} className={classes.userAvatar}/>
            <Typography variant="subtitle1" className={classes.userBioName} component={Link} to={`/users/${user.userId}`}>{user.userBioName}</Typography>
        </Paper>
    )
}

export default UserPaper
