import { makeStyles } from '@material-ui/core/styles'

export default makeStyles({
    postPaper: {
        margin: "20px 0"
    },
    paperHeader: {
        display: "flex",
        alignItems: "center",
        padding: 10
    },
    paperBody: {
        padding: 10,
        textIndent: 10
    },
    paperFooter: {
        padding: 10,
        textAlign: "center"
    },
    userAvatar: {
        marginRight: 10
    },
    userBioName: {
        color: 'black',
        textDecoration: "none",
        fontWeight: 600,
    },
    tagChip: {
        margin: "2.5px",
        borderRadius: 5
    },
})