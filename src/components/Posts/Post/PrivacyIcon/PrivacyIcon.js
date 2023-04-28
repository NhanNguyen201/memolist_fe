import { useState } from 'react';
import { Link } from 'react-router-dom'
import PublicIcon from '@material-ui/icons/Public';
import Grow from '@material-ui/core/Grow'
import LockIcon from '@material-ui/icons/Lock';
import { useSelector, useDispatch } from 'react-redux';
import Popover from '@material-ui/core/Popover';
import RoundButton from '../../../../utils/RoundButton';
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import { deletePost } from '../../../../redux/actions/posts';
import useStyle from './styles';

const PrivacyIcon = ({post : {_id : postId, userId, isPrivate}, handleDelete}) => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const { authenticated, userData } = useSelector(state => state.auth);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    
    const handleOpenPopOver = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClosePopOver = () => {
        setAnchorEl(null);
    };
    
    const handleCloseDialog = () => {
        setAnchorEl(null);
        setIsDialogOpen(false)
    }

    const handleConfirmDelete = () => {
        if(authenticated && userData?.userId === userId){
            if(typeof handleDelete === "function") {
                handleDelete(postId)
            } else {
                dispatch(deletePost(postId))
            }
            handleCloseDialog()
        }
    }
    // useEffect
    return (
        <>
            {(authenticated && userData?.userId === userId) ? <RoundButton 
                tip="Edit the post"
                placement="bottom"
                onClick={handleOpenPopOver}
            >
                {isPrivate ?  <LockIcon color="primary" fontSize="small"/> : <PublicIcon color="primary" fontSize="small"/>}
            </RoundButton> : (
                <RoundButton tip={`This post is ${isPrivate ? "private" : "public"}`} > 
                    {isPrivate ? <LockIcon color="primary" fontSize="small"/> : <PublicIcon color="primary" fontSize="small"/>}
                </RoundButton>
            )}
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClosePopOver}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Grow in>
                    <Paper className={classes.editPopoverPaper}>
                        <Button color="primary" variant="outlined" style={{marginBottom: 10}} component={Link} to={`/posts/${postId}/edit`}>Edit</Button>
                        <Button onClick={() => setIsDialogOpen(true)} color="primary" variant="outlined" >Delete</Button>
                    </Paper>
                </Grow>
            </Popover>
            <Dialog
                maxWidth="xs"
                aria-labelledby="confirmation-dialog-title"
                open={isDialogOpen}
                onClose={handleCloseDialog}
            >
                <DialogTitle id="confirmation-dialog-title">Delete dialog</DialogTitle>
                <DialogContent dividers>
                    <Typography variant="body1">Are you sure you want to delete this post. This action can not be undone</Typography>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={handleCloseDialog} variant="outlined">
                        Cancel
                    </Button>
                    <Button color="primary" variant="outlined" onClick={handleConfirmDelete}>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default PrivacyIcon
