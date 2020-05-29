import React, { Fragment, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import useFetch from "./hooks/fetch";
import { setUser, removeUser, setToken } from "./actions";
import { STORAGE_KEY } from "./constants";
import NavigationBar from "./components/NavigationBar";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import SettingsPage from "./pages/SettingsPage";

const App = () => {
    const mounted = useRef();
    const dispatch = useDispatch();
    let history = useHistory();
    const token = useSelector((state) => state.token);
    const [loading, setLoading] = useState(true);
    const { result, load } = useFetch("user");

    // Get Token from local storage
    useEffect(() => {
        if (!mounted.current) {
            // Component will mount
            if (!token) {
                const st_token = localStorage.getItem(STORAGE_KEY);
                setLoading(false);
                if (st_token) {
                    dispatch(setToken(st_token));
                    load(st_token);
                } else {
                    history.push("/");
                }
            } else {
                setLoading(false);
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
            localStorage.setItem(STORAGE_KEY, token);
        }
    }, [token]);

    return (
        <div className="App">
            {!loading &&
                (token ? (
                    <Fragment>
                        <NavigationBar />
                        <Switch>
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
                        </Switch>
                    </Fragment>
                ) : (
                    <Switch>
                        <Route path="/" exact>
                            <LandingPage />
                        </Route>
                        {/* Redirection */}
                        <Route path="/">
                            <Redirect to="/" />
                        </Route>
                    </Switch>
                ))}
        </div>
    );
};

export default App;
