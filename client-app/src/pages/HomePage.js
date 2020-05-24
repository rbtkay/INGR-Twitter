import React from 'react';

// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Header } from "semantic-ui-react";

import Auth from '../components/Auth'

const HomePage = () => {
    return (
        <div>
            <Auth />
            <Header as='h1'>Here we will show the user's keywords</Header>
        </div>
    );
}

export default HomePage;