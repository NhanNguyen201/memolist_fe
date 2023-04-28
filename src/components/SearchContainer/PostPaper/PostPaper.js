import { Paper, Avatar, Typography, Divider, Chip, Button } from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { useEffect, useState } from 'react';
import useTime from '../../../utils/hooks/useTime';
import { Link } from 'react-router-dom';
import useStyles from './styles'

const PostPaper = ({post}) => {
    const classes = useStyles();
    const [mediaImage, setMediaImage] = useState('https://res.cloudinary.com/nhannhan/image/upload/v1612679060/memolist/Memolist_a6ulh7.png');
    useEffect(() => {
        const thumbnailImage = post.selectedFiles.find(file => file.resource_type === 'image')
        if(thumbnailImage){
            setMediaImage(thumbnailImage.url)
        }
    }, [post])
    return (
        <Paper elevation={3} className={classes.postPaper}>
            <div className={classes.paperHeader}>
                <Avatar src={post.userImage} className={classes.userAvatar}/>
                <Typography variant="subtitle1" className={classes.userBioName} component={Link} to={`/users/${post.userId}`}>{post.userBioName}</Typography>
            </div>
            <Divider variant="middle"/>
            <div className={classes.paperBody}>
                <Typography variant="h5">{post.title}</Typography>
                <Typography variant="subtitle2" style={{margin: "10px 0"}}>
                    <AccessTimeIcon color="primary" style={{transform: "translateY(25%)"}}/>{useTime(post.createdAt)}
                </Typography>
                {post.tags && post.tags.map(
                    (tag, idx) => <Chip 
                        label={`#${tag}`} 
                        key={idx} 
                        component={Link} 
                        clickable 
                        color='secondary' 
                        size="medium"
                        to={`/search?q=top&term=${encodeURIComponent(`#${tag}`)}`} 
                        variant="outlined"
                        className={classes.tagChip}
                    />)
                }
                <Typography variant="body2" style={{marginTop: "10px"}}>{post.message}</Typography>
            </div>
            <img src={mediaImage} style={{width: "100%"}} alt="thumbnail" draggable="false"/>
            <Divider variant="middle"/>
            <div className={classes.paperFooter}>
                <Button variant="outlined" component={Link} to={`/posts/${post._id}`}>
                    <VisibilityIcon color="primary"/>
                    <Typography variant="body2">View</Typography>
                </Button>
            </div>
        </Paper>
    )
}

export default PostPaper
