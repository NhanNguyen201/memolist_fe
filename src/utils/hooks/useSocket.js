import io from "socket.io-client";
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

// eslint-disable-next-line
export default function(){
    const socketRef = useRef(null)
    const { authenticated, userData } = useSelector(state => state.auth);
    useEffect(() => {
        if(socketRef.current) return;
        if(userData){
            socketRef.current = io(process.env.REACT_APP_API_BASE_URL)
            socketRef.current.emit("login", { userData })
        }
    }, [socketRef, userData, authenticated])
}