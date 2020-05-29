import React from "react";
import {
    Header,
    Grid,
    GridColumn,
    Segment,
    Button,
    Container,
    Form,
    Label,
} from "semantic-ui-react";
import MiniForm from "../components/forms/MiniForm";
import Tweets from "../components/Tweets";
import Keywords from "../components/Keywords";

const HomePage = () => {
    //The component Tweets take in an array and render a list of tweets.
    const keywords = [
        { value: "#dev", isSelected: false },
        { value: "#corona", isSelected: false },
        { value: "#ipssi", isSelected: false },
        { value: "#ingr", isSelected: false },
    ];

    const setKeyword = (value) => {};
    const selectKeyword = (keyword) => {};

    return (
        <main className="home">
            <Container fluid>
                <Grid columns={2}>
                    <GridColumn width={12} textAlign={"center"}>
                        <Header as="h1">Dashboard</Header>
                        <MiniForm
                            url="keywords"
                            name="Add a new keyword"
                            label="Enter a keyword"
                            placeholder={"#"}
                            submitLabel={"+"}
                        />
                        <p>
                            Hastags you've already added, by <b>clicking on one</b> you
                            add it the analytics graph
                        </p>
                        <div className="keyword-menu">
                            <Keywords
                                keywords={keywords}
                                callback={(keyword) => selectKeyword(keyword)}
                            />
                        </div>
                    </GridColumn>
                    <GridColumn width={3}>
                        <Segment>
                            <Header as="h3">The Recent Tweets</Header>
                            <Tweets tweets={[1, 2, 3, 4]} />
                        </Segment>
                    </GridColumn>
                </Grid>
            </Container>
        </main>
    );
};

export default HomePage;
