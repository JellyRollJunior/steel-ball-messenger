import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { makeRequest } from '../utils/requests.js';
import { getUrl } from '../utils/serverUrl.js';
import { handleTokenError } from '../utils/handleTokenError.js';

const useUsers = () => {
    const [users, setUsers] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

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
                handleTokenError(error, navigate);
                // todo: throw notification if error
                setError('Error!');
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();

        return () => abortController.abort();
    }, [navigate]);

    return { users, isLoading, error };
};

export { useUsers };
