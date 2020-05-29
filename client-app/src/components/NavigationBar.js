import React from "react";
import { Link } from "react-router-dom";
import { Menu, Icon } from "semantic-ui-react";
import UserPanel from "./UserPanel";

const NavigationBar = () => (
    <header>
        <Menu>
            <Menu.Item>
                <Link to="home">
                    <Icon name="twitter" size="large" verticalAlign="middle" />
                    INGR
                </Link>
            </Menu.Item>
            <UserPanel />
        </Menu>
    </header>
);

export default NavigationBar;
