import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/register" exact component={LandingPage} />
          <Route path="/home" exact component={HomePage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
