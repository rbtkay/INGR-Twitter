/* global BigInt */
import React from "react";
import { List, ListItem, ListHeader, ListDescription } from "semantic-ui-react";

const Tweets = ({ tweets }) => {
    return (
        <List divided relaxed>
            {tweets.map((tweet, i) => (
                <ListItem key={i} className="tweet">
                    <ListHeader>{tweet.tweet_date}</ListHeader>
                    <ListDescription
                        as="a"
                        href={`https://twitter.com/${tweet.twitter_name}/status/${tweet.twitter_id.split("_")[0]}`}
                    >
                        {tweet.tweet_content}
                    </ListDescription>
                </ListItem>
            ))}
        </List>
    );
};

export default Tweets;
