import React, { Fragment, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import useFetch from "./hooks/fetch";
import { setUser, setToken } from "./actions";
import { STORAGE_KEY } from "./constants";
import NavigationBar from "./components/NavigationBar";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import SettingsPage from "./pages/SettingsPage";
import useLogout from "./hooks/logout";

const App = () => {
    const mounted = useRef();
    const dispatch = useDispatch();
    const history = useHistory();
    const { logout } = useLogout();
    const token = useSelector((state) => state.token);
    const [loading, setLoading] = useState(true);
    const [timer, setTimer] = useState(null);
    const { result: resultUser, load: getUser } = useFetch("user");
    const { result: resultToken, load: refreshToken } = useFetch("refresh-token");

    const setTimerToRefreshToken = () => {
        // Stops timer if token has change beetween the 30 min, to relaunch it
        if (timer) {
            clearTimeout(timer);
        }
        // Refreshs token in 30 min
        setTimer(setTimeout(() => refreshToken(token), 1800000));
    };

    // Get Token from local storage
    useEffect(() => {
        if (!mounted.current) {
            // Component will mount
            if (!token) {
                const st_token = localStorage.getItem(STORAGE_KEY);
                setLoading(false);
                if (st_token) {
                    dispatch(setToken(st_token));
                    getUser(st_token);
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
        if (resultUser) {
            if (resultUser.success) {
                dispatch(setUser(resultUser.user));
            } else {
                logout();
            }
        }
    }, [resultUser]);
    // Refresh Token
    useEffect(() => {
        if (resultToken) {
            if (resultToken.success) {
                dispatch(setToken(resultToken.token));
            } else {
                clearTimeout(timer);
                logout();
            }
        }
    }, [resultToken]);
    // Update Token
    useEffect(() => {
        if (token) {
            setTimerToRefreshToken();
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
