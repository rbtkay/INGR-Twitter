import React, { Fragment, useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Segment, Loader, Message } from 'semantic-ui-react';
import useFetch from '../hooks/fetch';
import MiniForm from '../components/forms/MiniForm';
import GraphLines from '../components/graph/GraphLines';
import Keywords from '../components/Keywords';

const KeywordPanel = () => {
    const mounted = useRef();
    const token = useSelector(state => state.token);
    const [loading, setLoading] = useState(true);
    const [keywords, setKeywords] = useState([]);
    const { result: resultGet, load: getKeywords } = useFetch('keywords');
    const { result: resultDelete, load: deleteKeywordFromAPI } = useFetch(
        'keywords/',
        'DELETE'
    );
    const [message, setMessage] = useState({
        display: false,
        type: '',
        value: '',
    });

    const addKeyword = result => {
        if (result.success) {
            getKeywords(token);
            // const cp_keywords = keywords.slice();
            // cp_keywords.push(result.keyword);
            // setKeywords(cp_keywords);
        }
    };

    const deleteKeyword = id => {
        id = parseInt(id, 10);
        const cp_keywords = keywords.filter((keyword, i) => keyword.id !== id);
        setKeywords(cp_keywords);
    };

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
            setLoading(false);
            if (resultGet.success) {
                setKeywords(resultGet.keywords);
            } else {
                setMessage({
                    display: true,
                    type: 'error',
                    value: resultGet.message,
                });
            }
        }
    }, [resultGet]);

    useEffect(() => {
        if (resultDelete) {
            if (resultDelete.success) {
                deleteKeyword(resultDelete.id);
            } else {
                setMessage({
                    display: true,
                    type: 'error',
                    value: resultDelete.message,
                });
            }
        }
    }, [resultDelete]);

    let series = keywords.map(keyword => ({
        name: keyword.name,
        data: keyword.scores
            ? keyword.scores.map(score => [score.date, score.number])
            : [],
    }));

    return (
        <Segment className="keyword-panel">
            <MiniForm
                url="keywords"
                name="name"
                label="Add a new keyword"
                labelStack={'#'}
                submitLabel={'+'}
                callback={result => addKeyword(result.response)}
            />
            {message.display && <Message error content={message.value} />}
            {loading ? (
                <Loader active inline="centered" />
            ) : (
                !!keywords.length && (
                    <Fragment>
                        <div className="keyword-menu">
                            <Keywords
                                keywords={keywords}
                                callback={index =>
                                    deleteKeywordFromAPI(token, null, keywords[index].id)
                                }
                            />
                        </div>
                        <GraphLines
                            id="graph-keyword-usation"
                            series={series}
                            title={'Hashtag usation every 10 minutes'}
                            xLabel="time"
                            yLabel="number of Tweets"
                        />
                    </Fragment>
                )
            )}
        </Segment>
    );
};

export default KeywordPanel;
