import { makeStyles } from '@material-ui/core/styles';
export default makeStyles(theme => ({
    pageContainer: {
        paddingBottom: 200
    },
    appImage: {
        width: '100%',
        objectFit: 'cover',
        objectPosition: 'center',
        marginBottom: 20,
        borderRadius: 5
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
    },
    signInText: {
        marginBottom: 20,
    },
}));