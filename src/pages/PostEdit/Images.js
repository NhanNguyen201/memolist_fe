import { Image } from 'cloudinary-react'
import Paper from '@material-ui/core/Paper';
import useStyle from './styles';
import DeleteIcon from '@material-ui/icons/Delete';
import RoundButton from '../../utils/RoundButton';
const EditImage = ({public_id, handleRemoveImage}) => {
    const classes = useStyle()
    return(
        <Paper elevation={3} className={classes.editedImagePaper}>
            <Image 
                cloudName={process.env.REACT_APP_CLOUDINARY_NAME} 
                publicId={public_id} 
                loading="lazy"
                crop="scale"
                dpr="auto"
                quality="auto"
                height="500" 
            />
            <RoundButton btnClassName={classes.editedImageDeleteButton} onClick={() => handleRemoveImage(public_id)} tip="Remove this image">
                <DeleteIcon color="secondary"/>
            </RoundButton>
        </Paper>
    )
}

export default function Images({selectedFiles, handleRemoveImage}) {
    const classes = useStyle()
    return (
        <div className={classes.imageContainer}>
            {selectedFiles.map(file => <EditImage key={file.public_id} public_id={file.public_id} handleRemoveImage={handleRemoveImage}/>)}
        </div>
    )
}
