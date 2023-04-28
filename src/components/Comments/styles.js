import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
    comment: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    commentDetail: {
        marginLeft: 10,
        width: '100%',
        padding: '5px 15px',
        borderRadius: 5
    },
    commentDetailUser: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
}));