import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    galleryContainer: {
        marginBottom: 20,
        marginTop: 20
    },
    videoContainer: {
        marginBottom: 20
    },
    imageContainer: {
        display: "flex",
        flexWrap: "wrap"
    },
    videoPaper: {
        padding: 10
    },
    imagePaper: {
        padding: 5,
        margin: 5,
        transition: "0.5s"
    }
}));