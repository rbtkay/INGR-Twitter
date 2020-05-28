import React from "react";

import {
  Header,
  Segment,
  Grid,
  GridColumn,
  Container,
  Tab,
  Form,
  Input,
  Message,
  Button,
} from "semantic-ui-react";
import { Link, Switch, Route, useHistory } from "react-router-dom";

import NavigationBar from "../components/NavigationBar";
import FormSignIn from "../components/FormSignIn";
import FormSignUp from "../components/FormSignUp";

const SettingsPage = () => {
  const history = useHistory();

  const panes = [
    {
      menuItem: "Modify email or username",
      render: () => (
        <Tab.Pane>
          <Input
            name={"username"}
            label="Username"
            placeholder="Enter username"
            required={true}
          />
          <Button color={"green"}>Save</Button>
          <br/>
          <br/>
          <Input
            name={"email"}
            label="Email"
            placeholder="Enter your email"
            required={true}
          />
          <Button color={"green"}>Save</Button>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Modify Password",
      render: () => (
        <Tab.Pane>
          <Form>
            <Input name={"old password"} type={"password"} label="Old Password" placeholder="Enter Old Password"/>
            <br/>
            <br/>
            <Input
              name={"password"}
              type={"password"}
              label="New Password"
              placeholder="Enter new password"
              required={true}
            />
            <br/>
            <br/>
            <Input
              name={"confirmation"}
              type={"password"}
              label="Confirm password"
              placeholder="Confirm new password"
              required={true}
            />
          </Form>
        </Tab.Pane>
      ),
    },
  ];

  return (
    <div>
      <NavigationBar />
      <Container>
        <Tab panes={panes} />
      </Container>
    </div>
  );
};

export default SettingsPage;
