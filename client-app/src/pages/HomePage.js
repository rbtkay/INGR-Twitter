import React, { Fragment, useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Header, Grid, GridColumn, Segment, Container } from "semantic-ui-react";
import useFetch from "../hooks/fetch";
import MiniForm from "../components/forms/MiniForm";
import GraphLines from "../components/graph/GraphLines";
import Tweets from "../components/Tweets";
import Keywords from "../components/Keywords";

const HomePage = () => {
    const mounted = useRef();
    const token = useSelector((state) => state.token);
    const [keywords, setKeywords] = useState([]);
    const { result: resultGet, load: getKeywords } = useFetch("keywords");
    const { result: resultDelete, load: deleteKeywordFromAPI } = useFetch(
        "keywords/",
        "DELETE"
    );

    useEffect(() => {
        if (!mounted.current) {
            // Component will mount
            getKeywords(token);
            setInterval(() => getKeywords(token), 600000);
            mounted.current = true;
        }
    });

    useEffect(() => {
        if (resultGet) {
            // setLoading(false);
            if (resultGet.success) {
                setKeywords(resultGet.keywords);
            }
        }
    }, [resultGet]);

    const addKeyword = (name) => {
        const cp_keywords = keywords.slice();
        if (name[0] !== "#") {
            name = `#${name}`;
        }
        cp_keywords.push({
            name,
            selected: true,
        });
        setKeywords(cp_keywords);
    };

    const selectKeyword = (index) => {
        const cp_keywords = keywords.slice();
        cp_keywords[index] = {
            ...keywords[index],
            selected: !keywords[index].selected,
        };
        setKeywords(cp_keywords);
    };

    const deleteKeyword = (index) => {
        deleteKeywordFromAPI(token, null, keywords[index].id);
        const cp_keywords = keywords.slice();
        delete cp_keywords[index];
        setKeywords(cp_keywords);
    };

    const series = keywords
        .filter((keyword) => keyword.selected)
        .map((keyword) => ({
            name: keyword.name,
            data: keyword.scores
                ? keyword.scores.map((score) => [score.date, score.number])
                : [],
        }));

    return (
        <main className="home">
            <Container fluid>
                <Grid columns={2}>
                    <GridColumn
                        largeScreen={12}
                        computer={12}
                        mobile={16}
                        textAlign={"center"}
                    >
                        <Header as="h1">Dashboard</Header>
                        <MiniForm
                            url="keywords"
                            name="name"
                            label="Add a new keyword"
                            placeholder={"#"}
                            submitLabel={"+"}
                            callback={(result) => addKeyword(result.value)}
                        />
                        {!!keywords.length && (
                            <Fragment>
                                <p>
                                    Hastags you've already added, by{" "}
                                    <b>clicking on one</b> you add it the analytics graph
                                </p>
                                <div className="keyword-menu">
                                    <Keywords
                                        keywords={keywords}
                                        callback={(index) => selectKeyword(index)}
                                        deleteIt={(index) => deleteKeyword(index)}
                                    />
                                </div>
                                <GraphLines
                                    id="graph-keyword-usation"
                                    series={series}
                                    title={"Hashtag usation every 10 minutes"}
                                    xLabel="time"
                                    yLabel="number of Tweets"
                                />
                            </Fragment>
                        )}
                    </GridColumn>
                    <GridColumn mobile={16} largeScreen={3} computer={3}>
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
