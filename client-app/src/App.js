import React, { Fragment, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import { setToken } from "./actions";
import { STORAGE_KEY } from "./constants";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";

const App = () => {
    const mounted = useRef();
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);

    useEffect(() => {
        if (!mounted.current) {
            // Component will mount
            if (!token) {
                const st_token = localStorage.getItem(STORAGE_KEY);
                if (st_token) {
                    dispatch(setToken(st_token));
                }
            }
            mounted.current = true;
        }
    });

    useEffect(() => {
        if (token) {
            localStorage.setItem(STORAGE_KEY, token);
        }
    }, [token]);

    return (
        <Router>
            <div className="App">
                <Switch>
                    {token ? (
                        <Fragment>
                            <Route path="/home" exact>
                                <HomePage />
                            </Route>
                            {/* Redirection */}
                            <Route path="/">
                                <Redirect to="/home" />
                            </Route>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <Route path="/" exact>
                                <LandingPage />
                            </Route>
                            {/* Redirection */}
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
