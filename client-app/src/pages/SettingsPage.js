import React, { Fragment } from "react";

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
  Divider,
  FormGroup,
  GridRow,
  Label,
  FormInput,
  FormButton,
} from "semantic-ui-react";
import { Link, Switch, Route, useHistory } from "react-router-dom";

import NavigationBar from "../components/NavigationBar";
import FormSignIn from "../components/FormSignIn";
import FormSignUp from "../components/FormSignUp";

const SettingsPage = () => {
  const history = useHistory();

  const usernameChange = ({ username }) => {
    console.log();
  };
  const emailChange = ({}) => {
    console.log();
  };
  const passwordChange = ({ oldPassword, newPassword, confirmPassword }) => {
    console.log();
  };

  return (
    <div>
      <NavigationBar />
      <Container>
        <Segment>
          <Grid columns={2} relaxed="very">
            <Grid.Column textAlign={"center"}>
              <Fragment>
                <Header as="h3">Modify Email or username</Header>
                <br/>
                <br/>
                <br/>
                <Input label={"Username"}/>
                <Button color={'green'} style={{marginLeft: '10px'}} onClick={usernameChange}>Save</Button>
                <br/>
                <br/>
                <Input label={"Email"}/>
                <Button color={'green'} style={{marginLeft: '10px'}} onClick={emailChange}>Save</Button>
                <br/>
              </Fragment>
            </Grid.Column>
            <Grid.Column>
              <Header textAlign={"center"} as="h3">Modify password</Header>
              <Form>
                <Input
                  name={"old password"}
                  type={"password"}
                  label="Old Password"
                  placeholder="Enter Old Password"
                  inline
                />
                <br />
                <br />
                <Input
                  name={"password"}
                  type={"password"}
                  label="New Password"
                  placeholder="Enter new password"
                  required={true}
                  inline
                />
                <br />
                <br />
                <Input
                  name={"confirmation"}
                  type={"password"}
                  label="C"
                  placeholder=""
                  required={true}
                  inline
                />
                <br />
                <br />
                <div style={{ textAlign: "center" }}>
                  <Button color={"green"} onClick={emailChange}>
                    Save
                  </Button>
                </div>
              </Form>
            </Grid.Column>
          </Grid>
          <Divider vertical>OR</Divider>
        </Segment>
      </Container>
    </div>
  );
};

export default SettingsPage;
