import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(theme => ({
    editorOpenBtn: {
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20, 
    },
    editorContainerDiv: {
        marginTop: 20,
        marginBottom: 20, 
        display: 'flex',
        justifyContent: "center",
        alignItems: "center"
    },
    storyEditorPaper: {
        padding: 10,
    },
    storyTimerPaper: {
        padding: '10px 40px',
        marginBottom: 20
    },
    timerContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
}))