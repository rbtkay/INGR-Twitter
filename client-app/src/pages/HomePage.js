import React from 'react';

// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Header, List } from "semantic-ui-react";

import Auth from '../components/Auth'
import NavigationBar from '../components/NavigationBar';
import Tweets from "../components/Tweets";

const HomePage = () => {

    //The component Tweets take in an array and render a list of tweets.

    return (
        <div>
            <NavigationBar />
            <Auth />
            <Header as='h1'>Here we will have an input to add new keywords and the list of all the user's keywords</Header>
            <Tweets tweets={[1,2,3,4]}/>
        </div>
    );
}

export default HomePage;