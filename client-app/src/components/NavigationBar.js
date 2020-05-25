import React, { useState } from 'react';

import { Menu, Input } from "semantic-ui-react";
import { Link } from 'react-router-dom';

const NavigationBar = () => {
    const [activeItem, setActiveUser] = useState("editorials")

    return (
        <div>
            <Menu>
                <Menu.Item>
                    <Link to={"/"}>Home</Link>
                </Menu.Item>
            </Menu>
        </div>
    )
}

export default NavigationBar