import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Header, Segment, Grid, Container, Button, Divider } from "semantic-ui-react";
import { setToken } from "../actions";
import FormPassword from "../components/forms/FormPassword";
import MiniForm from "../components/forms/MiniForm";

const SettingsPage = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state);

    return (
        <main className="settings">
            <Container>
                <Segment>
                    <Grid columns={2} relaxed="very">
                        <Grid.Column textAlign={"center"}>
                            <Header as="h3">Modify your profil</Header>
                            <MiniForm
                                url="username"
                                name="username"
                                label="Change Username"
                                placeholder={user.username}
                                method="PUT"
                                callback={(token) => dispatch(setToken(token))}
                            />
                            <MiniForm
                                url="email"
                                name="email"
                                label="Change Email Address"
                                placeholder={user.email}
                                method="PUT"
                            />
                            <MiniForm
                                url="twitter_name"
                                name="twitter_name"
                                label="Change registered Twitter login"
                                placeholder={user.twitter_name}
                                method="PUT"
                            />
                        </Grid.Column>
                        <Grid.Column>
                            <Header textAlign={"center"} as="h3">
                                Modify password
                            </Header>
                            <FormPassword />
                        </Grid.Column>
                    </Grid>
                    <Divider vertical>OR</Divider>
                </Segment>
            </Container>
        </main>
    );
};

export default SettingsPage;
