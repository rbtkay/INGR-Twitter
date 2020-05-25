import React, { useState } from 'react';

import { Link } from 'react-router-dom'
import { Form, Button, Message } from "semantic-ui-react";

import NavigationBar from '../components/NavigationBar';

const FormLogin = (props) => {
    const { submission } = props;

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [formError, setFormError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleClick = () => {

        if (!username || !password) {
            setErrorMsg("All fields are required");
            setFormError(true);
            return
        }
        if(!submission(username, password)){
            setFormError(true);
            setErrorMsg("Invalid Input");
        }
    }

    return (
        <Form error={formError}>
            <Form.Field>
                <label>Username</label>
                <input
                    placeholder='Enter username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </Form.Field>
            <Form.Field>
                <label>Password</label>
                <input
                    placeholder='Enter password'
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Field>
            <Message
                error
                header='Auth Failed'
                content={errorMsg}
            />
            <div style={{ textAlign: "center" }}>
                <Button color='green' type="submit" onClick={handleClick}>Login</Button>
                <Link to={"/register"}>New ?</Link>
            </div>
        </Form>
    );
}

export default FormLogin;