import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    pageContainer: {
        paddingBottom: 200
    },
    imageContainer: {
        display: "flex",
        flexWrap: "wrap",
        marginTop: 20,
        marginBottom: 20,
    },
    editedImagePaper: {
        position: "relative",
        padding: 5,
        margin: 5
    },
    editedImageDeleteButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        // transform: "translate(0,0)"
    },
    updateButton: {
        marginTop: 20,
        textAlign: "right",
    }
}));