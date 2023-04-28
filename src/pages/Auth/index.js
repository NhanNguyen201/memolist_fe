import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Grow from '@material-ui/core/Grow'
import GoogleButton from '../../components/GoogleBtn/GoogleButton';
import Memolist from '../../imgs/Memolist.png'
import useStyles from './styles';

const Auth = () => {
    const classes = useStyles();
    return (
        <Grow in>
            <Container component="main" maxWidth="xs">
                <Paper className={classes.paper} elevation={3}>
                    <img src={Memolist} alt="App" className={classes.appImage}/>
                    <Typography variant="h5" className={classes.signInText}>Sign in with google</Typography>
                    <GoogleButton goTo={'/'}/>
                </Paper>
            </Container>
        </Grow>
    )
}

export default Auth
