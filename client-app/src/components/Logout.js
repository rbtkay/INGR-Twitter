import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Dropdown } from "semantic-ui-react";
import { removeUser } from "../actions";
import { STORAGE_KEY } from "../constants";

const Logout = ({ username }) => {
    const dispatch = useDispatch();
    let history = useHistory();

    const destroySession = () => {
        //we will remove the token from the browser on logout.
        localStorage.removeItem(STORAGE_KEY);
        localStorage.clear();
        dispatch(removeUser());
        history.push("/"); //redirection to landing page
    };

    return (
        <Dropdown text={`Signed in as ${username}`}>
            <Dropdown.Menu>
                <Dropdown.Item>
                    <Link
                        to={"/"}
                        style={{ color: "red" }}
                        onClick={destroySession}
                    >
                        Sign out
                    </Link>
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default Logout;
