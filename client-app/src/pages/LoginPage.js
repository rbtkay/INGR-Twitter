import React from 'react';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Header } from "semantic-ui-react";

const LoginPage = () => {
  return (
    <div>
      <Header as='h1'>This is the login page</Header>
    </div>
  );
}

export default LoginPage;