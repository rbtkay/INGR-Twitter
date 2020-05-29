import React, { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Form, Button, Message } from "semantic-ui-react";
import { setUser } from "../../actions";
import useFetch from "../../hooks/fetch";
import Input from "./Input";

const FormSignIn = () => {
    const dispatch = useDispatch();
    const { result: resultToken, load: getToken } = useFetch("login_check", "POST");
    const { result: resultUser, load: getUser } = useFetch("user");
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState({
        display: false,
        type: "",
        value: "",
    });

    useEffect(() => {
        if (resultToken) {
            if (resultToken.success) {
                getUser(resultToken.token);
            } else {
                setLoading(false);
                setMessage({
                    display: !resultToken.success,
                    type: "error",
                    value: resultToken.message,
                });
            }
        }
    }, [resultToken]);

    useEffect(() => {
        if (resultUser) {
            if (resultUser.success) {
                resultUser.user.token = resultToken.token;
                dispatch(setUser(resultUser.user));
            } else {
                setLoading(false);
                setMessage({
                    display: !resultUser.success,
                    type: "error",
                    value: resultUser.message,
                });
            }
        }
    }, [resultUser]);

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
            if (checkValues() && !loading) {
                setLoading(true);
                getToken(null, { username, password });
            }
        },
        [getToken, username, password]
    );

    return (
        <Form
            error={message.type === "error" && message.display}
            success={message.type === "success" && message.display}
            onSubmit={onSubmit}
            loading={loading}
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
                <Button color="blue" type="submit" disabled={loading}>
                    Login
                </Button>
            </div>
        </Form>
    );
};

export default FormSignIn;
