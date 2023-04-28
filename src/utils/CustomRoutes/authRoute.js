import {Route, Redirect} from 'react-router-dom';
import { useSelector } from 'react-redux';
const AuthRoute = ({ component: Component, ...rest}) => {
    const { authenticated, userData } = useSelector(state => state.auth);
    return(
        <Route
            {...rest}
            render={(props) => (authenticated && userData) ? <Redirect to='/'/> : <Component {...props}/>}
        />
    )
}


export default AuthRoute;