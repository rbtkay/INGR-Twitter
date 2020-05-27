import React, { useState, useCallback, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Button, Message } from "semantic-ui-react";
import useFetch from "../hooks/fetch";

//import NavigationBar from "../components/NavigationBar";

const FormSignIn = () => {
    const history = useHistory();
    const { result, load, loading } = useFetch("login_check", "POST");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState({
        display: false,
        type: "",
        value: "",
    });

    useEffect(() => {
        if (result) {
            if (result.success) {
                history.push("/home");
            } else {
                setMessage({
                    display: !result.success,
                    type: "error",
                    value: result.message,
                });
            }
        }
    }, [result]);

    const checkValues = () => {
        if (!username || !password) {
            setMessage({
                display: true,
                type: "error",
                value: "All fields are required",
            });
            return false;
        }
        return true;
    };

    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();
            if (checkValues()) {
                load({ username, password });
            }
        },
        [load, username, password]
    );

    return (
        <Form
            error={message.type === "error" && message.display}
            success={message.type === "success" && message.display}
            onSubmit={onSubmit}
        >
            <Form.Field>
                <label>Username</label>
                <input
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </Form.Field>
            <Form.Field>
                <label>Password</label>
                <input
                    placeholder="Enter password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Field>
            <Message error content={message.value} />
            <Message success content={message.value} />
            <div style={{ textAlign: "center" }}>
                <Button color="green" type="submit">
                    Login
                </Button>
            </div>
        </Form>
    );
};

export default FormSignIn;
