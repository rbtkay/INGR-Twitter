import React from "react";

import {
    Header,
    Segment,
    Grid,
    GridColumn,
    Container,
    Tab,
    Icon,
} from "semantic-ui-react";
import FormSignIn from "../components/forms/FormSignIn";
import FormSignUp from "../components/forms/FormSignUp";

const HomePage = () => {
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
        <main className="landing">
            <Container>
                <Grid columns={2}>
                    <GridColumn>
                        <Header as="h1" color="blue">
                            <Icon name="twitter" size="large" verticalAlign="middle" />
                            INGR
                        </Header>
                        <article>
                            <Header as="h2">Presentation</Header>
                            <p>
                                Lorem Ipsum is simply dummy text of the printing and
                                typesetting industry. Lorem Ipsum has been the industry's
                                standard dummy text ever since the 1500s, when an unknown
                                printer took a galley of type and scrambled it to make a
                                type specimen book. It has survived not only five
                                centuries, but also the leap into electronic typesetting,
                                remaining essentially unchanged. It was popularised in the
                                1960s with the release of Letraset sheets containing Lorem
                                Ipsum passages, and more recently with desktop publishing
                                software like Aldus PageMaker including versions of Lorem
                                Ipsum.
                            </p>
                        </article>
                    </GridColumn>
                    <GridColumn>
                        <Segment>
                            <Tab panes={panes} />
                        </Segment>
                    </GridColumn>
                </Grid>
            </Container>
        </main>
    );
};

export default HomePage;
