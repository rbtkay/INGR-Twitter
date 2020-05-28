import React, { useState, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button, Message } from "semantic-ui-react";
import useFetch from "../../hooks/fetch";
import Input from "./Input";

const FormPassword = (props) => {
    const history = useHistory();
    const { result, load } = useFetch(props.url, "PUT");

    const [value, setValue] = useState("");
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
                // TODO If Token Set Token
            } else {
                setMessage({
                    display: !result.success,
                    type: "error",
                    value: result.message,
                });
            }
        }
    }, [result]);

    const checkValue = () => {
        if (!value) {
            setMessage({
                display: true,
                type: "error",
                value: "Field is required",
            });
            return false;
        }
        return true;
    };

    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();
            if (!loading && checkValue()) {
                setLoading(true);
                load({ value });
            }
        },
        [load, value]
    );

    return (
        <Form
            error={message.type === "error" && message.display}
            success={message.type === "success" && message.display}
            onSubmit={onSubmit}
        >
            <Input
                name={props.name}
                label={props.label}
                placeholder={props.placeholder || ""}
                // TODO control value
                setValue={(value) => setValue(value)}
                required={true}
            />
            <Button color="green" type="submit" loading={loading}>
                Ok
            </Button>
            <Message error content={message.value} />
            <Message success content={message.value} />
        </Form>
    );
};

export default FormPassword;
