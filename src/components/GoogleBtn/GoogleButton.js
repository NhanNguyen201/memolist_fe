import { useDispatch } from 'react-redux';
import { setAuth, setToken } from '../../redux/actions/auth'
import { GoogleLogin } from 'react-google-login';
import { useHistory } from 'react-router-dom';
import { loginWithGoogle } from '../../api'
import Button from '@material-ui/core/Button';
import Icon from '../../utils/googleIcon';

const GoogleButton = ({ goTo }) => {
    const dispatch = useDispatch();

    const history = useHistory();

    const googleSuccess = async (res) => {
        const token = res?.tokenId;
        try {
            setToken(token)
            const { data: userProfile } = await loginWithGoogle()
            dispatch(setAuth(userProfile))
            history.push(goTo);
        } catch (error) {
            console.log(error);
        }
    };
   
    const googleError = (error) => console.log(error);

    return (
        <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            render={(renderProps) => (
                <Button color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                    Google Sign In
                </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            // approvalPrompt="force"
            // prompt='consent'
            cookiePolicy={"single_host_origin"}
        />
    )
}

export default GoogleButton
