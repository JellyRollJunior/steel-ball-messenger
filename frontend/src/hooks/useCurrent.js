import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { makeRequest } from '../utils/requests.js';
import { getUrl } from '../utils/serverUrl.js';
import { handleTokenError } from '../utils/handleTokenError.js';

const useCurrent = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchCurrent = useCallback(async (signal) => {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        try {
            const data = await makeRequest(getUrl('/current'), {
                mode: 'cors',
                method: 'GET',
                headers: {
                    Authorization: `bearer ${token}`,
                },
                signal,
            });
            setUser({
                id: data.id,
                username: data.username,
                bio: data.bio,
            });
            setError(null);
        } catch (error) {
            handleTokenError(error, navigate)
            // todo: throw notification if error
            setError('Error!');
        } finally {
            setIsLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        const abortController = new AbortController();

        fetchCurrent(abortController.signal);

        return () => abortController.abort();
    }, [fetchCurrent]);

    const refetch = () => {
        fetchCurrent();
    };

    return {
        user,
        isLoading,
        error,
        refetch,
    };
};

export { useCurrent };
