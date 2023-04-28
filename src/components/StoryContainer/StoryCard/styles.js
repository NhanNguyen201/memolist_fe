import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(theme => ({
    storyCard: {
        width: 160,
    },
    headerMain: {
        display: 'flex',
        alignItems: 'center'
    },
    headerImg: {
        width: 40,
        height: 40,
        borderRadius: 40,
        marginRight: 10,
        filter: 'drop-shadow(0 0px 2px rgba(0, 0, 0, 0.5))',
        border: '2px solid rgba(255, 255, 255, 0.8)'
    },
    headertText: {
        display: 'flex',
        flexDirection: 'column',
        filter: 'drop-shadow(0 0px 3px rgba(0, 0, 0, 0.9))'
    },
    headerHeading: {
        fontSize: '1rem',
        color: 'rgba(255, 255, 255, 0.9)',
        margin: 0,
        marginBottom: 2
    },
    headerSubheading: {
        fontSize: '0.6rem',
        color: 'rgba(255, 255, 255, 0.8)',
        margin: 0
    },
    editButton: {
        marginRight: 10
    },
    editPopoverContainer: {
        padding: "10px 20px"
    },
    comment: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 10,
    },
    commentAvatar: {
        marginRight: 10,
        transform: "translateY(10%)",
    },
    commentDetailUserLink: {
        fontWeight: 600, 
        marginRight: 5, 
        textDecoration:'none'
    }
}))