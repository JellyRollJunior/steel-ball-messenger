import { useCallback, useEffect, useState } from 'react';
import { makeRequest } from '../utils/requests.js';
import { getUrl } from '../utils/serverUrl.js';
import { useNavigate } from 'react-router';
import { handleTokenError } from '../utils/handleTokenError.js';

const useChats = () => {
    const [chats, setChats] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchChats = useCallback(async (signal) => {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        try {
            const data = await makeRequest(getUrl('/chats'), {
                mode: 'cors',
                method: 'GET',
                headers: {
                    Authorization: `bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                signal,
            });
            setChats(data.chats);
            setError(null);
        } catch (error) {
            handleTokenError(error, navigate);
            // create error notification later
            setError('Error!');
        } finally {
            setIsLoading(true);
        }
    }, [navigate]);

    useEffect(() => {
        const abortController = new AbortController();

        fetchChats(abortController.signal);

        return () => abortController.abort();
    }, [fetchChats]);

    const refetch = () => {
        fetchChats();
    };

    return { chats, isLoading, error, refetch };
};

export { useChats };
