import React from 'react';

// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Header, Input, Grid, GridColumn, Segment, Button, Container } from "semantic-ui-react";

import Auth from '../components/Auth'
import NavigationBar from '../components/NavigationBar';
import Tweets from "../components/Tweets";

const HomePage = () => {

    //The component Tweets take in an array and render a list of tweets.

    return (
        <div>
            <NavigationBar />
            <Auth />
            {/* <Header as='h1'>Here we will have an input to add new keywords and the list of all the user's keywords</Header> */}
            <br />
            <Grid columns={2}>
                <GridColumn width={12} textAlign={"center"}>
                    <Header as='h1'>Add a new keyword</Header>
                    <Input />
                    <br />
                    <br />
                    <br />
                    <Button color={"green"}>+</Button>
                    <Container>
                        <Segment>
                            <div>asdasdasdasdasd
                                asdasdasdasdasdasd
                                asdasdasdasdasda
                                sda
                                sdasd
                                asdasdasdasdasdasddsa
                                sd
                            </div>
                        </Segment>
                    </Container>
                </GridColumn>
                <GridColumn width={3}>
                    <Segment>
                        <Header as='h1'>List of the last 10 user's tweets</Header>
                        <Tweets tweets={[1, 2, 3, 4]} />
                    </Segment>
                </GridColumn>
            </Grid>
        </div>
    );
}

export default HomePage;