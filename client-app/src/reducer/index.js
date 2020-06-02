import * as types from "../constants/actions";

const reducer = (state = {}, action) => {
    let nextState;

    switch (action.type) {
        case types.SET_USER:
            nextState = {
                ...state,
                ...action.user,
            };
            return nextState || state;

        case types.SET_TOKEN:
            nextState = {
                ...state,
                token: action.token,
            };
            return nextState || state;

        case types.SET_USERNAME:
            nextState = {
                ...state,
                username: action.username,
            };
            return nextState || state;

        case types.SET_EMAIL:
            nextState = {
                ...state,
                email: action.email,
            };
            return nextState || state;

        case types.SET_TWITTER_NAME:
            nextState = {
                ...state,
                twitter_name: action.twitter_name,
            };
            return nextState || state;

        case types.REMOVE_USER:
            return {};

        default:
            return state;
    }
};

export default reducer;
