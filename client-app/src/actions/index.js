import * as types from "../constants/actions";

export const setUser = (user) => ({
    type: types.SET_USER,
    user,
});

export const removeUser = () => ({
    type: types.REMOVE_USER,
});

export const setToken = (token) => ({
    type: types.SET_TOKEN,
    token,
});

export const setUserName = (username) => ({
    type: types.SET_USERNAME,
    username,
});

export const setEmail = (email) => ({
    type: types.SET_EMAIL,
    email,
});

export const setTwitterName = (twitter_name) => ({
    type: types.SET_TWITTER_NAME,
    twitter_name,
});
