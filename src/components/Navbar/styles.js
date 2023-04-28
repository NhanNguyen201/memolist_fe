import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
    
    appIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    navBarContainer: {
      display: 'flex',
      width: "100%",
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '5px'
    },
    navAuthContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    navAuthBioName: {
      marginRight: 10,
      fontWeight: 600,
      textDecoration: "none",

    },
    heading: {
      textDecoration: 'none'
    },

    [theme.breakpoints.down('sm')]: {
      navAuthBioName: {
        display: 'none'
      }
  }
}));