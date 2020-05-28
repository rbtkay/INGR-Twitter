import React from "react";

import {
    Header,
    Segment,
    Grid,
    GridColumn,
    Container,
    Tab,
} from "semantic-ui-react";
import { Link, Switch, Route, useHistory } from "react-router-dom";

import NavigationBar from "../components/NavigationBar";
import FormSignIn from "../components/forms/FormSignIn";
import FormSignUp from "../components/forms/FormSignUp";

const HomePage = () => {
    const history = useHistory();

    const panes = [
        {
            menuItem: "Sign In",
            render: () => (
                <Tab.Pane>
                    <FormSignIn />
                </Tab.Pane>
            ),
        },
        {
            menuItem: "Sign Up",
            render: () => (
                <Tab.Pane>
                    <FormSignUp />
                </Tab.Pane>
            ),
        },
    ];

    return (
        <div>
            <NavigationBar />
            <Container>
                <Grid columns={2}>
                    <GridColumn>
                        <Header size="huge">Landing Page</Header>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has
                            survived not only five centuries, but also the leap
                            into electronic typesetting, remaining essentially
                            unchanged. It was popularised in the 1960s with the
                            release of Letraset sheets containing Lorem Ipsum
                            passages, and more recently with desktop publishing
                            software like Aldus PageMaker including versions of
                            Lorem Ipsum.
                        </p>
                    </GridColumn>
                    <GridColumn>
                        <Segment>
                            <Tab panes={panes} />
                        </Segment>
                    </GridColumn>
                </Grid>
            </Container>
        </div>
    );
};

export default HomePage;
