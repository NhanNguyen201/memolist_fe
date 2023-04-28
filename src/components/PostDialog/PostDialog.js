import { useState, forwardRef } from 'react';
import { TextField, Button, Typography, Paper, Grid } from '@material-ui/core';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CreateIcon from '@material-ui/icons/Create';
import ChipInput from 'material-ui-chip-input'

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Slide from '@material-ui/core/Slide';
import FileBase from 'react-file-base64';
import RoundButton from '../../utils/RoundButton';

import { usePostForm } from '../../utils/hooks/usePostForm';

import useStyles from './styles';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default function PostDialog() {
    const [isDialogOpen, setDialogOpen] = useState(false);
    
    const classes = useStyles();

    const handleClickOpen = () => {
        setDialogOpen(true);
    };

    const handleClose = () => {
        setDialogOpen(false);
        clearForm();
    };
    const { values, errors, validate ,onSubmit, handleAddChip, handleRemoveChip, setForm, clearForm } = usePostForm({
        title: "",
        message: "",
        tags: [],
        isPrivate: false,
        selectedFiles: []
    })
    const handleSubmitClick = () => {
        onSubmit();
        const { valid } = validate();
        if(valid){
            handleClose();
        }
    }
    return (
        <div>
            <Grid container>
                <Grid item xs={12} md={2}>
                    <Paper elevation={3} className={classes.postPaper}>
                        <RoundButton tip="Post a memory" onClick={handleClickOpen}>
                            <CreateIcon color="primary"/>
                        </RoundButton>
                        <Typography variant="body1">Post a memory</Typography>
                    </Paper>
                </Grid>
            </Grid>
            <Dialog
                open={isDialogOpen}
                TransitionComponent={Transition}
                keepMounted
                maxWidth='sm'
                onClose={handleClose}
                aria-labelledby="Post_dialog"
                aria-describedby="Dialog discription"
            >
                <DialogTitle id="Post_dialog">Post a memory</DialogTitle>
                <DialogContent>
                    <TextField 
                        name="title" 
                        variant="outlined" 
                        label="Title" 
                        error={errors?.title}
                        helperText={errors?.title}
                        fullWidth
                        value={values.title}
                        className={classes.inputField}
                        onChange={(e) => setForm('title', e.target.value)}
                    />
                    <TextField 
                        name="message" 
                        variant="outlined" 
                        label="Message" 
                        multiline
                        fullWidth
                        value={values.message}
                        className={classes.inputField}
                        onChange={(e) => setForm('message', e.target.value)}
                    />
                
                    <ChipInput
                        value={values.tags}
                        fullWidth
                        variant="outlined"
                        label="Tags"
                        placeholder="Tags for your photos, can leave empty and we name them for you!"
                        onAdd={handleAddChip}
                        onDelete={handleRemoveChip}
                    />
                    <FormGroup 
                        row
                        className={classes.inputField}
                    >
                        <FormControlLabel
                            control={<Checkbox checked={values.isPrivate} onChange={(e) => setForm('isPrivate', !values.isPrivate)} name="isPrivateCheckbox" />}
                            label="Is private ?"
                        />
                    </FormGroup>
                    <div className={classes.fileInput}>
                        <FileBase
                            type="file"
                            multiple={true}
                            onDone={files => setForm('selectedFiles', files)}
                        />
                        {errors?.selectedFiles && (
                            <Typography variant="body2">{errors?.selectedFiles}</Typography>
                        )}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={clearForm} color="secondary">Cancel</Button>
                    <Button onClick={handleSubmitClick} color="primary">Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
