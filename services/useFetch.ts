import {useEffect, useState} from "react";

//custom hook for api functions
//fetchFunction can be either fetchMovies or fetchMovieDetails or anything from api

const useFetch = <T>(fetchFunction:() => Promise<T>, autoFetch = true) => {
    //different states of fetch api
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);

            //passing the api function here to make it more reusable
            const result = await fetchFunction();

            setData(result);

        }catch (err) {
            setError(err instanceof Error ? err : new Error('An error occurred.'));
        }finally {
            setLoading(false);
        }
    }

    const reset = () => {
        setData(null);
        setLoading(false);
        setError(null);
    }

    //to do when start loading the app
    useEffect(() => {
        if (autoFetch) {
            fetchData();
        }
    }, [])

    return {data, loading, error, refetch: fetchData, reset};
}

export default useFetch;