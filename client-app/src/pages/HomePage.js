import React from 'react';

// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Header } from "semantic-ui-react";

import Auth from '../components/Auth'
import NavigationBar from '../components/NavigationBar';

const HomePage = () => {
    return (
        <div>
            <NavigationBar />
            <Auth />
            <Header as='h1'>Here we will have an input to add new keywords and the list of all the user's keywords</Header>
        </div>
    );
}

export default HomePage;