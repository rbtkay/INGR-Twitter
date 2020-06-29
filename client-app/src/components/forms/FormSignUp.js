import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Button, Message, Label } from 'semantic-ui-react';
import { setUser } from '../../actions';
import useFetch from '../../hooks/fetch';
import Input from './Input';

const FormSignUp = () => {
    const dispatch = useDispatch();
    const { result, load } = useFetch('users', 'POST');
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [twitter_name, setTwitterName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmation, setConfirmation] = useState('');
    const [message, setMessage] = useState({
        display: false,
        type: '',
        value: '',
    });

    useEffect(() => {
        if (result) {
            if (result.success) {
                setMessage({
                    display: result.success,
                    type: 'success',
                    value: result.message,
                });
                dispatch(setUser(result.user));
            } else {
                setLoading(false);
                setMessage({
                    display: !result.success,
                    type: 'error',
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
                type: 'error',
                value: 'All fields are required',
            });
            return false;
        }
        if (!emailRegex.test(email)) {
            setMessage({
                display: true,
                type: 'error',
                value: 'Invalid Email',
            });
            return false;
        }
        if (password !== confirmation) {
            setMessage({
                display: true,
                type: 'error',
                value: "Passwords don't match",
            });
            return false;
        }
        return true;
    };

    const onSubmit = useCallback(
        e => {
            e.preventDefault();
            if (checkValues() && !loading) {
                load(null, {
                    username,
                    email,
                    password,
                    confirmation,
                    twitter_name,
                });
            }
        },
        [load, username, email, password, confirmation, twitter_name]
    );

    return (
        <Form
            error={message.type === 'error' && message.display}
            success={message.type === 'success' && message.display}
            onSubmit={onSubmit}
            loading={loading}
        >
            <Input
                name={'username'}
                label="Username"
                placeholder="Enter username"
                setValue={value => setUsername(value)}
                required={true}
            />
            <Form.Input
                name="twitterName"
                labelPosition="left"
                label="Login Twitter"
                placeholder="Enter your login Twitter"
                onChange={e => setTwitterName(e.target.value)}
            >
                <Label color="blue" className="label-stack">
                    @
                </Label>
                <input />
            </Form.Input>
            <Input
                name={'email'}
                label="Email"
                placeholder="Enter your email"
                setValue={value => setEmail(value)}
                required={true}
            />
            <Input
                name={'password'}
                type={'password'}
                label="Password"
                placeholder="Enter password"
                setValue={value => setPassword(value)}
                required={true}
            />
            <Input
                name={'confirmation'}
                type={'password'}
                label="Confirm password"
                placeholder="Confirm password"
                setValue={value => setConfirmation(value)}
                required={true}
            />
            <Message error content={message.value} />
            <Message success content={message.value} />
            <div className="text-center">
                <Button color="blue" type="submit" disabled={loading}>
                    Register
                </Button>
            </div>
        </Form>
    );
};

export default FormSignUp;
