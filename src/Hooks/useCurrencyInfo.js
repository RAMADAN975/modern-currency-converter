import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const res = await fetch(
                    `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`
                );

                const result = await res.json();
                setData(result[currency]);

            } catch (err) {
                setError("Failed to fetch currency data" + err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [currency]);

    return { data, loading, error };
}

export default useCurrencyInfo;