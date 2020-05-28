import React, { useState } from "react";

import { Menu, Input, Image } from "semantic-ui-react";
import { Link, Switch, Route } from "react-router-dom";

import Logout from "../components/Logout";

const NavigationBar = ({ username }) => {
    const [activeItem, setActiveUser] = useState("editorials");

    return (
        <div>
            <Menu>
                <Menu.Item>
                    <Link to={"/"} style={{ color: "black" }}>
                        Home
                    </Link>
                </Menu.Item>
                <Menu.Menu position={"right"}>
                    <Menu.Item>
                        <Switch>
                            <Route
                                path="/home"
                                exact
                                component={() => <Logout username={username} />}
                            />
                        </Switch>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        </div>
    );
};

export default NavigationBar;
