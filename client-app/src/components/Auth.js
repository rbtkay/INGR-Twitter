import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";

const Auth = () => {

    const [token, setToken] = useState(null)
    
    useEffect(() => {
        const storedToken = localStorage.getItem('token')
        setToken(storedToken);
    }, [])
    
    //TODO: remove the comment when the token is actually implemented
    // if (token) 
    return null;
    
    // return (
    //     <Redirect to={'/login'} />
    // );
}


export default Auth;