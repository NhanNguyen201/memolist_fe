import { makeStyles } from '@material-ui/core/styles';
export default makeStyles(theme => ({
    pageContainer: {
        paddingBottom: 200
    },
    personalInfo: {
        padding: 20,
        paddingTop: 80,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        background: "rgba(147, 128, 255, 0.3)"
    },
    userInfoImage: { // in user page
        height: 120,
        width: 120,
        marginRight: 20
    },
}));