import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'
import PrivacyIcon from './PrivacyIcon/PrivacyIcon';
import LikeAndView from './LikeAndView/LikeAndView';
import timeFromNow from '../../../utils/timeFromNow';
import { emojify } from 'react-emojione'
import useStyles from './styles';

const Post = ({post, handleLike, handleDelete}) => {
    const [mediaImage, setMediaImage] = useState('https://res.cloudinary.com/nhannhan/image/upload/v1612679060/memolist/Memolist_a6ulh7.png')
    
    useEffect(() => {
        const newMedia = post.selectedFiles.find(img => img.resource_type === 'image');
        if(newMedia) {
            setMediaImage(newMedia.url)
        }
    }, [post])

    const classes = useStyles();

    return (
        <Card className={classes.card} elevation={3} square={true}>
            <CardMedia className={classes.media} title={post.title} image={mediaImage}/>
            <CardHeader
                avatar={
                    <Avatar aria-label={post.userName} src={post.userImage}/>
                }
                title={
                    <Typography variant='subtitle1' className={classes.userName} component={Link} to={`/users/${post.userId}`} color='primary'>{post.userBioName}</Typography>
                }
                action={<PrivacyIcon post={post} handleDelete={handleDelete}/>}
                subheader={timeFromNow(post.createdAt)}
            />
            <CardContent>
                <div className={classes.tagDetails}>
                    {post.tags.map((tag, index) => 
                        <Chip 
                            label={`#${tag}`} 
                            key={index}
                            variant="outlined" 
                            clickable
                            color='secondary' 
                            size="medium"
                            component={Link}
                            to={`/search?q=top&term=${encodeURIComponent(`#${tag}`)}`}
                            className={classes.tagChip}
                        />)
                    }
                </div>
                <Typography className={classes.title} variant="h5" gutterBottom>{emojify(post.title)}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <LikeAndView post={post} handleLike={handleLike}/>
            </CardActions>
        </Card>
    )
}

export default Post
