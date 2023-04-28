import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
    commentInput: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20
    },
    commentAvatar: {
        transform: 'translateY(-25%)'
    },
    input: {
        width: '100%',
        marginLeft: 10,
    },
    submitBtn: {
        marginTop: 10,
    },
    signinPaper: {
        padding: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    signinGrid: {
        marginTop: 10,
        marginBottom: 20
    }
}));