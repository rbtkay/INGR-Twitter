import React, { Fragment } from "react";

import {
    Header,
    Segment,
    Grid,
    Container,
    Button,
    Divider,
} from "semantic-ui-react";
import { Link, Switch, Route, useHistory } from "react-router-dom";

import NavigationBar from "../components/NavigationBar";
import FormPassword from "../components/forms/FormPassword";
import MiniForm from "../components/forms/MiniForm";
import Input from "../components/forms/Input";

const SettingsPage = () => {
    const history = useHistory();

    const usernameChange = ({ username }) => {
        console.log();
    };
    const emailChange = ({}) => {
        console.log();
    };
    const passwordChange = ({ oldPassword, newPassword, confirmPassword }) => {
        console.log();
    };

    return (
        <div>
            <NavigationBar username={""} />
            <Container>
                <Segment>
                    <Grid columns={2} relaxed="very">
                        <Grid.Column textAlign={"center"}>
                            <Header as="h3">Modify your profil</Header>
                            <MiniForm
                                url="username"
                                name="username"
                                label="Change Username"
                                // placeholder={ username stored }
                            />
                            <MiniForm
                                url="email"
                                name="email"
                                label="Change Email Address"
                                // placeholder={ email stored }
                            />
                            <MiniForm
                                url="twitter_name"
                                name="twitter_name"
                                label="Change registered Twitter login"
                                // placeholder={ twitter_name stored }
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
        </div>
    );
};

export default SettingsPage;
