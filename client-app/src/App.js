import React, { Component } from "react";

import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import SettingsPage from "./pages/SettingsPage";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
    return (
        <Router>
            <div className="App">
                <Switch>
                    {/* {token ? ( */}
                    <Route path="/home" exact component={HomePage} />
                    {/* ) : ( */}
                    <Route path="/settings" exact component={SettingsPage} />
                    <Route path="/" component={LandingPage} />
                    {/* )} */}
                </Switch>
            </div>
        </Router>
    );
};

export default App;
