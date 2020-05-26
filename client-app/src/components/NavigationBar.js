import React, { useState } from 'react';

import { Menu, Input, Image } from "semantic-ui-react";
import { Link, Switch, Route } from 'react-router-dom';

import Logout from '../components/Logout';

const NavigationBar = () => {
    const [activeItem, setActiveUser] = useState("editorials")

    const auth_btn_style = {
        color: "green"
    }

    return (
        <div>
            <Menu>
                <Menu.Item>
                    <Link to={"/"} style={{ color: "black" }}>Home</Link>
                </Menu.Item>
                <Menu.Menu position={'right'}>
                    <Menu.Item>
                        <Switch>
                            <Route path="/" exact component={() => <Link to={"/register"} style={auth_btn_style}>Sign Up</Link>} />
                            <Route path="/register" exact component={() => <Link to={"/"} style={auth_btn_style}>Login</Link>} />
                            <Route path="/home" exact component={Logout} />
                        </Switch>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        </div>
    )
}



export default NavigationBar