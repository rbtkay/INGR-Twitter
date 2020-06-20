import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { removeUser } from "../actions";
import { STORAGE_KEY } from "../constants";

const useLogout = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const logout = useCallback(() => {
        // Remove the token from the browser on logout.
        localStorage.removeItem(STORAGE_KEY);
        localStorage.clear();
        dispatch(removeUser());
        // Redirection to landing page
        history.push("/");
    }, [history, localStorage]);
    return { logout };
};

export default useLogout;
