import React, { useState } from 'react';

import { Menu, Input, Image } from "semantic-ui-react";
import { Link } from 'react-router-dom';

const NavigationBar = () => {
    const [activeItem, setActiveUser] = useState("editorials")

    return (
        <div>
            <Menu>
                <Menu.Item>
                    <Link to={"/"} style={{ color: "black" }}>Home</Link>
                </Menu.Item>
            </Menu>
        </div>
    )
}

export default NavigationBar