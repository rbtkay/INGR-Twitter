import React from 'react'
import { List } from "semantic-ui-react";

const Tweets = ({ tweets }) => {

    const result = tweets.map((tweet) => {
        return (
            <List.Item>
                <List.Icon name='twitter' size='large' verticalAlign='middle' />
                <List.Content>
                    <List.Header as='a'>Semantic-Org/Semantic-UI</List.Header>
                    <List.Description as='a'>Updated 10 mins ago</List.Description>
                </List.Content>
            </List.Item>
        )
    });

    return (
        <List divided relaxed>
            {result}
        </List>
    )
}

export default Tweets;