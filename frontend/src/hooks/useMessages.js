import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { makeRequest } from '../utils/requests.js';
import { getUrl } from '../utils/serverUrl.js';
import { handleTokenError } from '../utils/handleTokenError.js';

const useMessages = (chatId) => {
    const [messages, setMessages] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchMessages = useCallback(
        async (signal) => {
            if (!chatId) return;
            setIsLoading(true);
            const token = localStorage.getItem('token');
            try {
                const data = await makeRequest(getUrl(`/chats/${chatId}`), {
                    mode: 'cors',
                    method: 'GET',
                    headers: {
                        Authorization: `bearer ${token}`,
                    },
                    signal,
                });
                data.messages ? setMessages(data.messages) : setMessages(null);
                setError(null);
            } catch (error) {
                handleTokenError(error, navigate);
                setError(error.message ? error.message : error.name);
            } finally {
                setIsLoading(false);
            }
        },
        [chatId, navigate]
    );

    useEffect(() => {
        const abortController = new AbortController();

        fetchMessages(abortController.signal);

        return () => abortController.abort();
    }, [fetchMessages]);

    const refetch = () => {
        fetchMessages();
    };

    return { messages, isLoading, error, refetch };
};

export { useMessages };
