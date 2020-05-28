import React from "react";
import { useSelector } from "react-redux";
import { Header, Segment, Grid, Container, Button, Divider } from "semantic-ui-react";
import NavigationBar from "../components/NavigationBar";
import FormPassword from "../components/forms/FormPassword";
import MiniForm from "../components/forms/MiniForm";

const SettingsPage = () => {
    const user = useSelector((state) => state);
    return (
        <div>
            <NavigationBar />
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
                            />
                            <MiniForm
                                url="email"
                                name="email"
                                label="Change Email Address"
                                placeholder={user.email}
                            />
                            <MiniForm
                                url="twitter_name"
                                name="twitter_name"
                                label="Change registered Twitter login"
                                placeholder={user.twitter_name}
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
