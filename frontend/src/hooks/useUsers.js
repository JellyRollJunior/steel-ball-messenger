import { useEffect, useState } from 'react';
import { makeRequest } from '../utils/requests.js';
import { getUrl } from '../utils/serverUrl.js';

const useUsers = () => {
    const [users, setUsers] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();
        const fetchUsers = async () => {
            setIsLoading(true);
            const token = localStorage.getItem('token');
            try {
                const data = await makeRequest(getUrl('/users'), {
                    mode: 'cors',
                    method: 'GET',
                    headers: {
                        Authorization: `bearer ${token}`,
                    },
                    signal: abortController.signal,
                });
                setUsers(data.users);
                setError(null);
            } catch (error) {
                console.log(error);
                setError('Error!');
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();

        return () => abortController.abort();
    }, []);

    return { users, isLoading, error };
};

export { useUsers };
