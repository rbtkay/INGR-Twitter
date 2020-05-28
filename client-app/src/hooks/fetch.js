import { useState, useCallback } from "react";
import { API_URL } from "../constants";

const useFetch = (url, method = "GET") => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const load = useCallback(
        async (token, data) => {
            setLoading(true);
            console.log(data);

            const params = {
                method,
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            };
            if (token) {
                params.headers.Authorization = `Bearer ${token}`;
            }
            if (data) {
                params.body = JSON.stringify(data);
            }

            try {
                const response = await fetch(API_URL + url, params);
                // console.log(response);
                const responseJson = await response.json();
                console.log(responseJson);
                if (
                    response.ok &&
                    (response.status === 200 || response.status === 201)
                ) {
                    responseJson.success = true;
                    setResult(responseJson);
                } else {
                    throw responseJson;
                }
            } catch (error) {
                error.success = false;
                setResult(error);
                console.error(error);
            }

            setLoading(false);
        },
        [url, method]
    );

    return { result, load, loading };
};

export default useFetch;
