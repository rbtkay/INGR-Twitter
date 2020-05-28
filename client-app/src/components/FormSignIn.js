import React, { useState, useCallback, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Form, Button, Message } from "semantic-ui-react";
import { setToken } from "../actions";
import useFetch from "../hooks/fetch";
import Input from "./Input";

//import NavigationBar from "../components/NavigationBar";

const FormSignIn = () => {
    const mounted = useRef();
    const dispatch = useDispatch();
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
        if (!mounted.current) {
            mounted.current = true;
        }
        return () => {
            mounted.current = false;
        };
    });

    useEffect(() => {
        if (result && mounted.current) {
            if (result.success) {
                dispatch(setToken(result.token));
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
                load(null, { username, password });
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
            <Input
                name={"username"}
                label="Username"
                placeholder="Enter username"
                setValue={(value) => setUsername(value)}
                required={true}
            />
            <Input
                name={"password"}
                type={"password"}
                label="Password"
                placeholder="Enter password"
                setValue={(value) => setPassword(value)}
                required={true}
            />
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
