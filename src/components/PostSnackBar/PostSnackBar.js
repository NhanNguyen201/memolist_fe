import { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import Alert from '@material-ui/lab/Alert';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const PostSnackBar = () => {
    const postTemp = useSelector(state => state.doPosting);
    return (
        <>
            <Snackbar 
                open={postTemp.loading}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                TransitionComponent={Transition}
            > 
                <Alert icon={<HourglassEmptyIcon fontSize="inherit" />} severity="info">
                    Posting a memory
                </Alert>
            </Snackbar>
            <Snackbar 
                open={postTemp.success}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                TransitionComponent={Transition}
            >
                <Alert icon={<CheckCircleOutlineIcon fontSize="inherit" />} severity="success">
                    Posting complete
                </Alert>
            </Snackbar>
        </>
    )
}


export default PostSnackBar
