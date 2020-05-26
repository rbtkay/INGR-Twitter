import { useState, useCallback } from "react";

const useFetchActions = ({ url }) => {
    const [loading, setLoading] = useState(false)
    const [items, setItems] = useState([])
    const load = useCallback(async () => {
        setLoading(true);

        const response = await fetch(url, {
            headers: {
                'Accept': 'application/ld.json'
            }
        });

        const responseData = await response.json();

        if (response.ok) {
            setItems(responseData);
        }
        setLoading(false);
    }, [url])

    return { items, load, loading }
}

export default useFetchActions