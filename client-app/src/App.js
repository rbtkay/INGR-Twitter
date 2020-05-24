import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={LandingPage}/>
          <Route path="/login" component={LoginPage}/>
          <Route path="/home" exact component={HomePage}/>
          <Route path="/home/:id" component={HomePage}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
