import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
    replyInput: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 20
    },
    replyAvatar: {
        transform: 'translateY(25%)'
    },
    input: {
        width: '100%',
        marginLeft: 10,
    }
}));