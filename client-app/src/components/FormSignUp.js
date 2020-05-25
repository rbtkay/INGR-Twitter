import React, { useState } from 'react';

import { Link } from 'react-router-dom'
import { Form, Button, Message } from "semantic-ui-react";

import NavigationBar from '../components/NavigationBar';

const FormSignUp = ({ submission }) => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [formError, setFormError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleClick = () => {

        const emailRegex = new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/);

        if (!username || !email || !password || !confirmPassword) {
            setErrorMsg("All fields are required");
            setFormError(true);
            return
        } else if (!emailRegex.test(email)) {
            setFormError(true);
            setErrorMsg("Invalid Email");
            return
        } else if (password !== confirmPassword) {
            setFormError(true);
            setErrorMsg("Passwords don't match");
        } else {
            if (!submission(username, email, password, confirmPassword)) {
                setFormError(true);
                setErrorMsg("Something went wrong");
            }
        }
    }

    return (
        <Form error={formError}>
            <Form.Field>
                <label>Username</label>
                <input placeholder='Enter username' onChange={e => setUsername(e.target.value)} />
            </Form.Field>
            <Form.Field>
                <label>Email</label>
                <input placeholder='Enter email' type="email" onChange={e => setEmail(e.target.value)} />
            </Form.Field>
            <Form.Field>
                <label>Password</label>
                <input placeholder='Enter password' type="password" onChange={e => setPassword(e.target.value)} />
            </Form.Field>
            <Form.Field>
                <label>Confirm Password</label>
                <input placeholder='Confirm password' type="password" onChange={e => setConfirmPassword(e.target.value)} />
            </Form.Field>
            <div style={{ textAlign: "center" }}>
                <Button color='green' type='submit' onClick={handleClick}>Register</Button>
                <Link to={"/"}>already a member ?</Link>
            </div>
            <Message
                error
                header='Input Error'
                content={errorMsg}
            />
        </Form>
    );
}

export default FormSignUp;