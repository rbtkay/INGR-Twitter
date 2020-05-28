import React, { Component, Fragment } from "react";
import { useSelector } from "react-redux";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";

const App = () => {
    const token = useSelector((state) => state.token);
    console.log(token);

    return (
        <Router>
            <div className="App">
                <Switch>
                    {token ? (
                        <Fragment>
                            <Route path="/home" exact>
                                <HomePage />
                            </Route>
                            <Route path="/">
                                <Redirect to="/home" />
                            </Route>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <Route path="/" exact>
                                <LandingPage />
                            </Route>
                            <Route path="/">
                                <Redirect to="/" />
                            </Route>
                        </Fragment>
                    )}
                </Switch>
            </div>
        </Router>
    );
};

export default App;
