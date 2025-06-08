import { useEffect, useState } from 'react';
import { makeRequest } from '../utils/requests.js';
import { getUrl } from '../utils/serverUrl.js';

const useUsers = () => {
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();
        const fetchUsers = async () => {
            setLoading(true);
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
                setLoading(false);
            }
        };

        fetchUsers();

        return () => abortController.abort();
    }, []);

    return { users, loading, error };
};

export { useUsers };
