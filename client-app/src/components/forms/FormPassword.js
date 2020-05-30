import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button, Message } from "semantic-ui-react";
import { setToken } from "../../actions";
import useFetch from "../../hooks/fetch";
import Input from "./Input";

const FormPassword = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const { result, load } = useFetch("password", "PUT");

    const [old_password, setOldPassword] = useState("");
    const [new_password, setNewPassword] = useState("");
    const [confirmation, setConfirmation] = useState("");
    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState({
        display: false,
        type: "",
        value: "",
    });

    useEffect(() => {
        if (result) {
            setLoading(false);
            if (result.success) {
                setMessage({
                    display: result.success,
                    type: "success",
                    value: result.message,
                });
                dispatch(setToken(result.token));
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
        if (!old_password || !new_password || !confirmation) {
            setMessage({
                display: true,
                type: "error",
                value: "All fields are required",
            });
            return false;
        }
        if (new_password !== confirmation) {
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
            if (!loading && checkValues()) {
                setLoading(true);
                load(token, { old_password, new_password, confirmation });
            }
        },
        [load, old_password, new_password, confirmation]
    );

    return (
        <Form
            error={message.type === "error" && message.display}
            success={message.type === "success" && message.display}
            onSubmit={onSubmit}
            loading={loading}
        >
            <Input
                name={"old_password"}
                type={"password"}
                label="Current Password"
                placeholder="Enter your current password"
                setValue={(value) => setOldPassword(value)}
                required={true}
            />
            <Input
                name={"new_password"}
                type={"password"}
                label="New Password"
                placeholder="Enter a new password"
                setValue={(value) => setNewPassword(value)}
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
            <div className="text-center">
                <Button color="blue" type="submit" disabled={loading}>
                    Validate
                </Button>
            </div>
        </Form>
    );
};

export default FormPassword;
