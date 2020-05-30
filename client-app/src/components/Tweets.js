import React from "react";
import {
    List,
    ListItem,
    ListContent,
    ListHeader,
    ListIcon,
    ListDescription,
    Loader,
} from "semantic-ui-react";

const Tweets = ({ tweets }) => {
    if (!tweets) return <Loader active inline="centered" />;

    const result = tweets.map((tweet, i) => {
        return (
            <ListItem key={i}>
                <ListIcon name="twitter" size="large" verticalAlign="middle" />
                <ListContent>
                    <ListHeader as="a">Semantic-Org/Semantic-UI</ListHeader>
                    <ListDescription as="a">Updated 10 mins ago</ListDescription>
                </ListContent>
            </ListItem>
        );
    });

    return (
        <List divided relaxed>
            {result}
        </List>
    );
};

export default Tweets;
