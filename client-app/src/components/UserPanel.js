import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Dropdown, Menu } from "semantic-ui-react";
import { removeUser } from "../actions";
import { STORAGE_KEY } from "../constants";

const UserPanel = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state);
    let history = useHistory();

    const destroySession = () => {
        //we will remove the token from the browser on logout.
        localStorage.removeItem(STORAGE_KEY);
        localStorage.clear();
        dispatch(removeUser());
        history.push("/"); //redirection to landing page
    };

    return (
        <Menu.Menu position={"right"}>
            <Menu.Item>
                <Dropdown text={`Signed in as ${user.username}`}>
                    <Dropdown.Menu>
                        <Dropdown.Item>
                            <Link to={"/settings"}>Settings</Link>
                        </Dropdown.Item>
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
            </Menu.Item>
        </Menu.Menu>
    );
};

export default UserPanel;
