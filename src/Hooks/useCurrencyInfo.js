import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!currency) return;

        const controller = new AbortController();

        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const res = await fetch(
                    `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`,
                    { signal: controller.signal }
                );

                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }

                const result = await res.json();

                if (!result[currency]) {
                    throw new Error("Invalid currency data");
                }

                setData(result[currency]);

            } catch (err) {
                if (err.name !== "AbortError") {
                    setError(err.message || "Something went wrong");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        return () => controller.abort(); // 🔥 مهم جدًا
    }, [currency]);

    return { data, loading, error };
}

export default useCurrencyInfo;