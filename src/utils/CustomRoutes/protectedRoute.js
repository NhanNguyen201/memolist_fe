import {Route, Redirect} from 'react-router-dom';
import { useSelector } from 'react-redux';
const ProtectedRoute = ({ component: Component, ...rest}) => {
    const { authenticated } = useSelector(state => state.auth);
    return(
        <Route
            {...rest}
            render={(props) => authenticated ? <Component {...props}/> :<Redirect to='/'/> }
        />
    )
}


export default ProtectedRoute;