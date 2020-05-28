import React from "react";
import {
  List,
  ListItem,
  ListContent,
  ListHeader,
  ListIcon,
  ListDescription,
} from "semantic-ui-react";

const Tweets = ({ tweets }) => {
  const result = tweets.map((tweet) => {
    return (
      <ListItem>
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
