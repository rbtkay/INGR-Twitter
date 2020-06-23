import React, { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Form, Button, Message, Label } from 'semantic-ui-react';
import useFetch from '../../hooks/fetch';
import Input from './Input';

const MiniForm = ({
    url,
    method = 'POST',
    callback,
    name,
    type = 'text',
    label,
    placeholder,
    submitLabel = 'Ok',
    labelStack,
}) => {
    const token = useSelector(state => state.token);
    const { result, load } = useFetch(url, method);

    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState({
        display: false,
        type: '',
        value: '',
    });

    useEffect(() => {
        if (result) {
            setLoading(false);
            if (result.success) {
                setMessage({
                    display: result.success,
                    type: 'success',
                    value: result.message,
                });
                if (callback) {
                    callback({ value, response: result });
                }
            } else {
                setMessage({
                    display: !result.success,
                    type: 'error',
                    value: result.message,
                });
            }
        }
    }, [result]);

    const checkValue = () => {
        if (!value) {
            setMessage({
                display: true,
                type: 'error',
                value: 'Field is required',
            });
            return false;
        }
        return true;
    };

    const onSubmit = useCallback(
        e => {
            e.preventDefault();
            if (!loading && checkValue()) {
                setLoading(true);
                const tp_value = {};
                tp_value[name] = value;
                load(token, tp_value);
            }
        },
        [load, value]
    );

    return (
        <Form
            error={message.type === 'error' && message.display}
            success={message.type === 'success' && message.display}
            onSubmit={onSubmit}
            loading={loading}
            className="mini-form"
        >
            <Form.Input
                name={name}
                labelPosition="left"
                label={label}
                type={type}
                placeholder={placeholder}
                onChange={e => setValue(e.target.value)}
                required
                inline
            >
                {!!labelStack && (
                    <Label color="blue" className="label-stack">
                        {labelStack}
                    </Label>
                )}
                <input />
                <Button color="blue" type="submit" disabled={loading}>
                    {submitLabel}
                </Button>
            </Form.Input>
            <Message error content={message.value} />
            <Message success content={message.value} />
        </Form>
    );
};

export default MiniForm;
