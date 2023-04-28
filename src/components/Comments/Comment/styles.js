import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
    comment: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 10,
    },
    commentDetail: {
        marginLeft: 10,
        width: '100%',
        padding: '5px 15px',
        borderRadius: 10
    },
    commentDetailHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    commentDetailUser: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    commentDetailUserLink: {
        fontWeight: 600, 
        marginRight: 5, 
        textDecoration:'none'
    },
    commentLikeAndReply: {
        marginTop: 10,
        display: "flex",
        alignItems: "center"
    },
    loginPaper: {
        padding: 20
    },
    reactionsContainer: {
        paddingRight: 10,
    }
}));