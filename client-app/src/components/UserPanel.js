import React from "react";
import { Link, useHistory, Switch } from "react-router-dom";
import { Dropdown, Menu } from "semantic-ui-react";

const UserPanel = ({ username }) => {
  let history = useHistory();

  const destroySession = () => {
    //we will remove the token from the browser on logout.
    console.log("Destroying token");
    history.push("/"); //redirection to landing page
  };

  return (
    <Menu.Menu position={"right"}>
      <Menu.Item>
        <Dropdown text={`Signed in as`}>
          <Dropdown.Menu>
            <Dropdown.Item>
              <Link to={"/settings"}>Settings</Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to={"/"} style={{ color: "red" }} onClick={destroySession}>
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
