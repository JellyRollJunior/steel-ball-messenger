import { useEffect, useState } from 'react';
import { makeRequest } from '../utils/requests.js';
import { getUrl } from '../utils/serverUrl.js';

const useMessages = (chatId) => {
    const [messages, setMessages] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();

        const fetchMessages = async () => {
            setIsLoading(true);
            const token = localStorage.getItem('token');
            try {
                const data = await makeRequest(
                    getUrl(`/chats/${chatId}`),
                    {
                        mode: 'cors',
                        method: 'GET',
                        headers: {
                            Authorization: `bearer ${token}`,
                        },
                        signal: abortController.signal,
                    }
                );
                setMessages(data.messages);
                setError(null);
            } catch (error) {
                console.log(error);
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMessages();

        return () => abortController.abort();
    }, [chatId]);

    return { messages, isLoading, error };
};

export { useMessages };
