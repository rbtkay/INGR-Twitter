import React from "react";
import { Header, Grid, GridColumn, Container } from "semantic-ui-react";
import TweetPanel from "../components/TweetPanel";
import KeywordPanel from "../components/KeywordPanel";

const HomePage = () => {
    return (
        <main className="home">
            <Container fluid>
                <Header as="h1" textAlign="center">
                    Dashboard
                </Header>
                <Grid columns={2}>
                    <GridColumn
                        largeScreen={11}
                        computer={11}
                        mobile={16}
                        textAlign={"center"}
                    >
                        <KeywordPanel />
                    </GridColumn>
                    <GridColumn mobile={16} largeScreen={5} computer={5}>
                        <TweetPanel />
                    </GridColumn>
                </Grid>
            </Container>
        </main>
    );
};

export default HomePage;
