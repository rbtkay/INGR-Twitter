import React, { Fragment, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import useFetch from "./hooks/fetch";
import { setUser, removeUser, setToken } from "./actions";
import { STORAGE_KEY } from "./constants";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import SettingsPage from "./pages/SettingsPage";

const App = () => {
    const mounted = useRef();
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    // const [loading, setLoading] = useState(true);
    const { result, load } = useFetch("user");
    // Get Token from local storage
    useEffect(() => {
        if (!mounted.current) {
            // Component will mount
            if (!token) {
                const st_token = localStorage.getItem(STORAGE_KEY);
                if (st_token) {
                    dispatch(setToken(st_token));
                    load(st_token);
                }
            }
            mounted.current = true;
        }
    });
    // Get User
    useEffect(() => {
        if (result) {
            if (result.success) {
                dispatch(setUser(result.user));
            } else {
                localStorage.removeItem(STORAGE_KEY);
                localStorage.clear();
                dispatch(removeUser());
            }
        }
    }, [result]);
    // Update Token
    useEffect(() => {
        if (token) {
            // setLoading(false);
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
                            <Route path="/settings" exact>
                                <SettingsPage />
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
