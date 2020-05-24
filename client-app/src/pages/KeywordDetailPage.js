import React from 'react';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Header } from "semantic-ui-react";

import Auth from "../components/Auth";

const LoginPage = () => {
  return (
    <div>
      <Auth />
      <Header as='h1'>We will have here the keywords details</Header>
    </div>
  );
}

export default LoginPage;