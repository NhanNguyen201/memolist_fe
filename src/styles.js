import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
    appBar: {
      margin: '0 0 10px 0',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    heading: {
      color: 'rgba(115,115,115, 1)',
    },
    image: {
      marginLeft: '15px',
    },
    [theme.breakpoints.down('sm')]: {
        mainContainer : {
          flexDirection: 'column-reverse',
        }
    }
  }));