import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { SET_USER } from '../../redux/type'
import { logout } from '../../redux/actions/auth';
import { useLocation } from 'react-router-dom';

export default function useAuth(){
    const location = useLocation();
    const dispatch = useDispatch();
    useEffect(() => {
        const token = localStorage.memolistToken;
        if(token){
            const decodedToken = jwtDecode(token);
            if((decodedToken.exp * 1000) < Date.now()){
                dispatch(logout())
            } else {
                const user = JSON.parse(localStorage.getItem("profile"))
                dispatch({
                    type: SET_USER,
                    payload: user
                })
            }
        }
    }, [dispatch, location])
}
