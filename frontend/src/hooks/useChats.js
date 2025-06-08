import { useEffect, useState } from 'react';
import { makeRequest } from '../utils/requests.js';
import { getUrl } from '../utils/serverUrl.js';

const useChats = () => {
    const [chats, setChats] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();
        const fetchChats = async () => {
            setLoading(true);
            const token = localStorage.getItem('token');
            try {
                const data = await makeRequest(getUrl('/chats'), {
                    mode: 'cors',
                    method: 'GET',
                    headers: {
                        Authorization: `bearer ${token}`,
                    },
                    signal: abortController.signal,
                });
                setChats(data.chats);
                setError(null);
            } catch (error) {
                console.log(error);
                setError('Error!');
            } finally {
                setLoading(false);
            }
        };

        fetchChats();

        return () => abortController.abort();
    }, []);

    return { chats, loading, error };
};

export { useChats };
