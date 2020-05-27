import React, { useState, useCallback, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Button, Message } from "semantic-ui-react";
import useFetch from "../hooks/fetch";
import Input from "./Input";

//import NavigationBar from "../components/NavigationBar";

const FormSignUp = () => {
    const history = useHistory();
    const { result, load, loading } = useFetch("users", "POST");

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmation, setConfirmation] = useState("");
    const [message, setMessage] = useState({
        display: false,
        type: "",
        value: "",
    });

    useEffect(() => {
        if (result) {
            if (result.success) {
                setMessage({
                    display: result.success,
                    type: "success",
                    value: result.message,
                });
                // history.push("/home");
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
        const emailRegex = new RegExp(
            /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
        );

        if (!username || !email || !password || !confirmation) {
            setMessage({
                display: true,
                type: "error",
                value: "All fields are required",
            });
            return false;
        }
        if (!emailRegex.test(email)) {
            setMessage({
                display: true,
                type: "error",
                value: "Invalid Email",
            });
            return false;
        }
        if (password !== confirmation) {
            setMessage({
                display: true,
                type: "error",
                value: "Passwords don't match",
            });
            return false;
        }
        return true;
    };

    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();
            if (checkValues()) {
                load({ username, email, password, confirmation });
            }
        },
        [load, username, email, password, confirmation]
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
                name={"email"}
                label="Email"
                placeholder="Enter your email"
                setValue={(value) => setEmail(value)}
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
            <Input
                name={"confirmation"}
                type={"password"}
                label="Confirm password"
                placeholder="Confirm password"
                setValue={(value) => setConfirmation(value)}
                required={true}
            />
            <Message error content={message.value} />
            <Message success content={message.value} />
            <div style={{ textAlign: "center" }}>
                <Button color="green" type="submit">
                    Register
                </Button>
            </div>
        </Form>
    );
};

export default FormSignUp;
