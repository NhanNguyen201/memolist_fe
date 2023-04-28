import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getPost, editPost } from '../../api'
import Grow from '@material-ui/core/Grow'
import TextField from '@material-ui/core/TextField'
import ChipInput from 'material-ui-chip-input'
import Typography from '@material-ui/core/Typography'
import FileBase from 'react-file-base64';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button'
import Images from './Images';
import useStyle from './styles'
export default function PostEdit() {
    const classes = useStyle() 
    const { authenticated } = useSelector(state => state.auth)
    const { postId } = useParams();
    
    const [error, setError] = useState("")
    
    const [title, setTitle] = useState("")
    const [message, setMessage] = useState("")
    const [selectedFiles, setSelectedFiles] = useState([])
    const [tags, setTags] = useState([])
    const [newFiles, setNewFiles] = useState([])

    const [isDialogOpen, setIsDialogOpen] = useState(false)
    useEffect(() => (async() => {
        try {
            const { data } = await getPost(postId);        
            setTitle(data.title)
            setMessage(data.message)
            setTags(data.tags)
            setSelectedFiles(data.selectedFiles)
        } catch (error) {
            setError(error.response ? error.response.data.error : "Something is wrong")
            console.log(error.response ? error.response.data.error: error)
        }
    })()
    // eslint-disable-next-line
    , [ postId ])
    
    const handleChipRemove = (chip, index) => {
        let copyChip = tags.filter(tag => tag !== chip);        
        setTags(copyChip)
    }
    const handleRemoveImage = id => {
        let copyFiles = selectedFiles.filter(file => file.public_id !== id)
        setSelectedFiles(copyFiles)
    }
    const handleOpenDialog = () => setIsDialogOpen(true)
    const handleCloseDialog = () => setIsDialogOpen(false)
    const handleConfirmUpdate = async () => {
        if(authenticated) {
            const { data } = await editPost(postId, {title, message, selectedFiles, newFiles, tags})
            setTitle(data.title);
            setMessage(data.message)
            setSelectedFiles(data.selectedFiles)
            setNewFiles([])
            setIsDialogOpen(false)
        }
    }
    return (
        <Grow in>
            {error 
            ?<Container maxWidth="lg">
                {error && <Typography variant="body1">{error}</Typography>}
            </Container> 
            :<Container maxWidth="lg" className={classes.pageContainer}>
                <Typography variant="h6" gutterBottom>Post title:</Typography>
                <TextField 
                    value={title}
                    fullWidth
                    variant="outlined"
                    label="Post title"
                    onChange={e => setTitle(e.target.value)}
                />
                <Typography variant="h6" gutterBottom>Post message:</Typography>
                <TextField 
                    value={message}
                    fullWidth
                    variant="outlined"
                    label="Post message"
                    onChange={e => setMessage(e.target.value)}
                />
                <Typography variant="h6" gutterBottom>Post tags:</Typography>
                <ChipInput
                    value={tags}
                    fullWidth
                    onAdd={(chip) => setTags([...tags, chip])}
                    onDelete={(chip, index) => handleChipRemove(chip, index)}
                />
                <Images selectedFiles={selectedFiles} handleRemoveImage={handleRemoveImage}/>
                <Typography variant="h6" gutterBottom>New images:</Typography>
                <FileBase
                    type="file"
                    multiple={true}
                    onDone={files => setNewFiles(files)}
                />
                <div className={classes.updateButton}>
                    <Button variant="outlined" color="primary" onClick={handleOpenDialog}>Update Post</Button>
                </div>
                <Dialog
                    open={isDialogOpen}
                    maxWidth="sm"
                    fullWidth
                    onClose={handleCloseDialog}
                >
                    <DialogTitle>
                        Edit post dialog
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>Are you sure you want to edit this post ?</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" onClick={handleCloseDialog} color="primary">
                            Cancel
                        </Button>
                        <Button variant="outlined" onClick={handleConfirmUpdate} color="primary">
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>}
        </Grow>
    )
}
