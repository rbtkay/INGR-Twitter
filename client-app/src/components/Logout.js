import React from 'react';
import { Link, useHistory } from "react-router-dom";
import { Dropdown } from "semantic-ui-react";

const Logout = ({ username }) => {
    let history = useHistory();

    const destroySession = () => {
        //we will remove the token from the browser on logout.
        console.log("Destroying token");
        history.push('/'); //redirection to landing page
    }

    return (
        <Dropdown text={`Signed in as ${username}`}>
            <Dropdown.Menu>
                <Dropdown.Item>
                    <Link to={"/"} style={{ color: "red" }} onClick={destroySession}>Sign out</Link>
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default Logout;
