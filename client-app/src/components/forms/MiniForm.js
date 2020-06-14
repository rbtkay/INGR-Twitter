import React, { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { Form, Button, Message } from "semantic-ui-react";
import useFetch from "../../hooks/fetch";
import Input from "./Input";

const FormPassword = (props) => {
    const token = useSelector((state) => state.token);
    const { result, load } = useFetch(props.url, props.method || "POST");

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
                if (props.callback) {
                    console.log(result);
                    props.callback({ value, response: result });
                }
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
                const tp_value = {};
                tp_value[props.name] = value;
                load(token, tp_value);
            }
        },
        [load, value]
    );

    return (
        <Form
            error={message.type === "error" && message.display}
            success={message.type === "success" && message.display}
            onSubmit={onSubmit}
            loading={loading}
            className="mini-form"
        >
            <Form.Field inline>
                <Input
                    name={props.name}
                    label={props.label}
                    placeholder={props.placeholder || ""}
                    setValue={(value) => setValue(value)}
                    required={true}
                    inline={true}
                />
                <Button color="blue" type="submit" disabled={loading}>
                    {props.submitLabel || "Ok"}
                </Button>
            </Form.Field>
            <Message error content={message.value} />
            <Message success content={message.value} />
        </Form>
    );
};

export default FormPassword;
