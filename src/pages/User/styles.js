import { makeStyles } from '@material-ui/core/styles';
export default makeStyles(theme => ({
    pageContainer: {
        paddingBottom: 200
    },
    userInfo: {
        paddingTop: 50,
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    userInfoImage: { // in user page
        height: 140,
        width: 140,
        borderRadius: "50%",
        marginBottom: 10
    },
    userImage: { // in post page
        marginRight: 10
    },
}));