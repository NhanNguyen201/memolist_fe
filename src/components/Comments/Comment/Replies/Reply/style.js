import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
    reply: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 10,
    },
    replyDetail: {
        marginLeft: 10,
        width: '100%',
        padding: '5px 15px',
        borderRadius: 10
    },
    replyDetailUser: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    replyDetailUserLink: {
        fontWeight: 600, 
        marginRight: 5, 
        textDecoration:'none'
    }
}));