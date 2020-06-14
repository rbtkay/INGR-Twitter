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
            // Automaticaly refresh tweets every hours, f5 make it instantly
            setInterval(() => load(user.token), 3600000);
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
