import React from "react";
import { useSelector } from "react-redux";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import UserPanel from "./UserPanel";

const NavigationBar = () => {
    const token = useSelector((state) => state.token);
    return (
        <div>
            <Menu>
                <Menu.Item>
                    <Link to={"/"} style={{ color: "black" }}>
                        Home
                    </Link>
                </Menu.Item>
                {token && <UserPanel />}
            </Menu>
        </div>
    );
};

export default NavigationBar;
