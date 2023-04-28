import { makeStyles } from '@material-ui/core/styles';
export default makeStyles(theme => ({
    pageContainer: {
        paddingBottom: 200
    },
    
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
   
    mediaImage: {
        width: '100%',
        height: '100%',
        objectFit: "cover",
        objectPosition: "center"
    },
    avatarGroup: {
        marginTop: 20,
        marginBottom: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
   
    titleDiv: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    },
    userBioName: {
        fontWeight: 600,
        textDecoration: 'none',
    },
    likeContainer: {
        marginTop: 20
    },
    loginPaper: {
        padding: 20
    },
    heartIcon: {
        transform: 'translateY(25%)',
    },
    tagChipContainer: {
        margin: "10px 0"
    },
    tagChip: {
        margin: "2.5px",
        borderRadius: 5
    },
    userImage: { // in post page
        marginRight: 10
    },
    tabs: {
        borderRight: `10px solix blue`
    },
  }));