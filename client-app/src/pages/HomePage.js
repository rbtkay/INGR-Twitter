import React from "react";
import { useSelector } from "react-redux";
import {
    Header,
    Input,
    Grid,
    GridColumn,
    Segment,
    Button,
    Container,
    Icon,
    Label,
} from "semantic-ui-react";

import NavigationBar from "../components/NavigationBar";
import Tweets from "../components/Tweets";
import Keywords from '../components/Keywords';

const HomePage = () => {
    const user = useSelector((state) => state);
    console.log(user);
    //The component Tweets take in an array and render a list of tweets.
    const keywords = [
        { value: "#dev", isSelected: false },
        { value: "#corona", isSelected: false },
        { value: "#ipssi", isSelected: false },
        { value: "#ingr", isSelected: false },
    ];

    const selectKeyword = (keyword) => {
        console.log(keyword);
    };

    return (
        <div>
            <NavigationBar username={user.username || ""} />
            <br />
            <Grid columns={2}>
                <GridColumn width={12} textAlign={"center"}>
                    <Header as="h1">Add a new keyword</Header>
                    <Input />
                    <br />
                    <br />
                    <Button color={"green"}>+</Button>
                    <br />
                    <br />
                    <div>
                        <p>
                            Hastags you've already added, by{" "}
                            <b>clicking on one</b> you add it the analytics
                            graph
                        </p>
                        <Keywords
                            keywords={keywords}
                            callback={(keyword) => selectKeyword(keyword)}
                        />
                    </div>
                    <br />
                    <br />
                    <br />
                    <Container textAlign={"left"}>
                        <Segment>
                            <p>
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                            </p>
                        </Segment>
                    </Container>
                </GridColumn>
                <GridColumn width={3}>
                    <Segment>
                        <Header as="h3">The Recent Tweets</Header>
                        <Tweets tweets={[1, 2, 3, 4]} />
                    </Segment>
                </GridColumn>
            </Grid>
        </div>
    );
};

export default HomePage;
