import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Header,
    Segment,
    Grid,
    Container,
    Button,
    Divider,
    Icon,
    Message,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { setToken, setUserName, setEmail, setTwitterName } from '../actions';
import useFetch from '../hooks/fetch';
import FormPassword from '../components/forms/FormPassword';
import MiniForm from '../components/forms/MiniForm';
import useLogout from '../hooks/logout';

const SettingsPage = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state);
    const [loading, setLoading] = useState(false);
    const { result: resultDelete, load: deleteUser } = useFetch('user', 'DELETE');
    const { logout } = useLogout();
    const [message, setMessage] = useState({
        display: false,
        type: '',
        value: '',
    });

    useEffect(() => {
        if (resultDelete) {
            if (resultDelete.success) {
                setMessage({
                    display: true,
                    type: 'success',
                    value: resultDelete.message,
                });
                setTimeout(logout, 1500);
            } else {
                setLoading(false);
                setMessage({
                    display: true,
                    type: 'error',
                    value: resultDelete.message,
                });
            }
        }
    }, [resultDelete]);

    return (
        <main className="settings">
            <Container>
                <Link to="/home" className="go-back-btn" title="Go back">
                    <Icon name="share" size="large" />
                </Link>
                <Segment>
                    <Grid columns={2} relaxed="very">
                        <Grid.Column textAlign={'center'}>
                            <Header as="h3">Modify your profil</Header>
                            <MiniForm
                                url="username"
                                name="username"
                                label="Change Username"
                                placeholder={user.username}
                                method="PUT"
                                callback={result => {
                                    dispatch(setToken(result.response.token));
                                    dispatch(setUserName(result.value));
                                }}
                            />
                            <MiniForm
                                url="email"
                                name="email"
                                label="Change Email Address"
                                placeholder={user.email}
                                method="PUT"
                                callback={result => dispatch(setEmail(result.value))}
                            />
                            <MiniForm
                                url="twitter_name"
                                name="twitter_name"
                                label="Change registered Twitter login"
                                placeholder={user.twitter_name}
                                method="PUT"
                                callback={result =>
                                    dispatch(setTwitterName(result.value))
                                }
                            />
                        </Grid.Column>
                        <Grid.Column>
                            <Header textAlign={'center'} as="h3">
                                Modify password
                            </Header>
                            <FormPassword />
                        </Grid.Column>
                    </Grid>
                    <Divider vertical>OR</Divider>
                </Segment>
                <Button
                    color="red"
                    className="delete-account"
                    onClick={evt => {
                        deleteUser(user.token);
                        setLoading(true);
                    }}
                    loading={loading}
                >
                    Delete your account <Icon name="trash alternate" className="delete" />
                </Button>
                {message.display && (
                    <Message
                        error={message.type === 'error'}
                        success={message.type === 'success'}
                        content={message.value}
                    />
                )}
            </Container>
        </main>
    );
};

export default SettingsPage;
