import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Dropdown, Menu } from "semantic-ui-react";
import useLogout from "../hooks/logout";

const UserPanel = () => {
    const user = useSelector((state) => state);
    const { logout } = useLogout();

    return (
        <Menu.Menu position={"right"}>
            <Menu.Item>
                <Dropdown text={`Signed in as ${user.username}`}>
                    <Dropdown.Menu>
                        <Dropdown.Item>
                            <Link to={"/settings"}>Settings</Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <Link to={"/"} className="text-red" onClick={logout}>
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
