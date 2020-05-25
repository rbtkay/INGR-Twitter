import React from 'react';

import { Header, Segment, Button, Grid, GridColumn, Form, Checkbox, Container } from "semantic-ui-react";
import { Link, Router, Switch, Route, Redirect, useHistory } from 'react-router-dom'

import NavigationBar from '../components/NavigationBar';
import FormLogin from '../components/FormLogin';
import FormSignUp from '../components/FormSignUp';

import useFetchActions from "../hooks/fetchActions";

const HomePage = () => {
    let history = useHistory();
    
    const loginSubmit = (username, password) => {
        //fetch login --> if successfull redirect to homepage, if failed return false to activate form error
        // return false;
        // const loginHook = useFetchActions();
        history.push('/home');
    }

    const signUpSubmit = (formResult) => {
        //fetch signUp --> if successfull redirect to homepage, if failed return false to activate form error
        // return false
        history.push('/home');
    }

    return (
        <div>
            <NavigationBar />
            <br />
            <Container>
                <Grid columns={2}>
                    <GridColumn>
                        <Header size="huge">Landing Page</Header>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    </GridColumn>
                    <GridColumn>
                        <Segment>
                            <Switch>
                                <Route path="/" exact component={() => <FormLogin submission={loginSubmit}/>} />
                                <Route path="/register" exact component={() => <FormSignUp submission={signUpSubmit}/>} />
                            </Switch>
                        </Segment>
                    </GridColumn>
                </Grid>
            </Container>
        </div>
    );
}

export default HomePage;