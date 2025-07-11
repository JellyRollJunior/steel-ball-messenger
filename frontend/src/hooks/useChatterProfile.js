import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { makeRequest } from '../utils/requests.js';
import { getUrl } from '../utils/serverUrl.js';
import { handleTokenError } from '../utils/handleTokenError.js';

const useChatterProfile = (userId) => {
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchProfile = useCallback(
        async (signal) => {
            if (!userId) return;
            setIsLoading(true);

            const token = localStorage.getItem('token');
            try {
                const data = await makeRequest(
                    getUrl(`/users/${userId}/profiles`),
                    {
                        mode: 'cors',
                        method: 'GET',
                        headers: {
                            Authorization: `bearer ${token}`,
                        },
                        signal,
                    }
                );
                setProfile(data);
                console.log(data);
                setError(null);
            } catch (error) {
                handleTokenError(error, navigate);
                console.log(error);
                setError(error.message ? error.message : error.name);
            } finally {
                setIsLoading(false);
            }
        },
        [userId, navigate]
    );

    useEffect(() => {
        const abortController = new AbortController();

        fetchProfile(abortController.signal);

        return () => abortController.abort();
    }, [fetchProfile]);

    return { profile, isLoading, error };
};

export { useChatterProfile };
