import React from 'react';
import { Link, useHistory } from "react-router-dom";

const Logout = () => {
    let history = useHistory();

    const destroySession = () => {
        //we will remove the token from the browser on logout.
        console.log("Destroying token");
        // history.push('/'); //redirection to landing page
    }

    return (
        <Link to={"/"} style={{ color: "red" }} onClick={destroySession}>Logout</Link>
    )
}

export default Logout;