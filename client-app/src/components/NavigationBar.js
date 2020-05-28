import React, { useState } from "react";

import { Menu, Input, Image, Dropdown } from "semantic-ui-react";
import { Link, Switch, Route } from "react-router-dom";

import UserPanel from "./UserPanel";

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
        <Route path="/home" exact>
          <UserPanel />
        </Route>
      </Menu>
    </div>
  );
};

export default NavigationBar;
