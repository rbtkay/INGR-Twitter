import React from 'react';

import {
    Header,
    Segment,
    Grid,
    GridColumn,
    Container,
    Tab,
    Icon,
} from 'semantic-ui-react';
import FormSignIn from '../components/forms/FormSignIn';
import FormSignUp from '../components/forms/FormSignUp';

const HomePage = () => {
    const panes = [
        {
            menuItem: 'Sign In',
            render: () => (
                <Tab.Pane>
                    <FormSignIn />
                </Tab.Pane>
            ),
        },
        {
            menuItem: 'Sign Up',
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
                            <Icon name="twitter" size="large" />
                            INGR
                        </Header>
                        <article>
                            <Header as="h2">Presentation</Header>
                            <p>
                                <strong>INGR Twitter</strong> vous permet de suivre le
                                nombre de publication sur le <strong>hashtag</strong> de
                                votre choix, toutes les 10 minutes. Vous pourrez aussi y
                                retrouver vos 10 derniers <strong>tweets</strong>.<br />
                                <br />
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                sed do eiusmod tempor incididunt ut labore et dolore magna
                                aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                Duis aute irure dolor in reprehenderit in voluptate velit
                                esse cillum dolore eu fugiat nulla pariatur.
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
