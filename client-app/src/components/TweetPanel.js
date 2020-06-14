import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Header, Segment, Icon, Loader } from "semantic-ui-react";
import Tweets from "../components/Tweets";
import useFetch from "../hooks/fetch";

const TweetPanel = () => {
    const mounted = useRef();
    const user = useSelector((state) => state);
    const [loading, setLoading] = useState(true);
    const [tweets, setTweets] = useState([]);
    const { result, load } = useFetch("tweets");

    useEffect(() => {
        if (!mounted.current) {
            // Component will mount
            load(user.token);
            mounted.current = true;
        }
    });

    useEffect(() => {
        if (result) {
            setLoading(false);
            if (result.success) {
                setTweets(result.tweets);
            }
        }
    }, [result]);

    return (
        <Segment>
            <Header as="h3">
                <Icon name="twitter" size="large" color="blue" />
                <span className="text-blue">{user.twitter_name}</span> Tweets
            </Header>
            {loading ? (
                <Loader active inline="centered" />
            ) : tweets.length ? (
                <Tweets tweets={tweets} />
            ) : (
                <p>You don't have tweets</p>
            )}
        </Segment>
    );
};

export default TweetPanel;
