import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  postPaper: {
    padding: 5,
    display: "flex",
    alignItems: "center", 
    marginBottom: 10,
    marginTop: 10
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
  inputField: {
      margin: "5px 0"
  },
  buttonSubmit: {
    marginBottom: 10,
  },
}));