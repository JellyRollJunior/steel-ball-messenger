import { useState, useEffect } from 'react';
import { makeRequest } from '../utils/requests.js';
import { getUrl } from '../utils/serverUrl.js';

const useProfiles = (userId) => {
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();

        const fetchProfiles = async () => {
            setIsLoading(true);
            try {
                const profile = await makeRequest(
                    getUrl(`/users/${userId}/profiles`),
                    {
                        mode: 'cors',
                        method: 'GET',
                        signal: abortController.signal,
                    }
                );
                setProfile(profile);
                setError(null);
            } catch (error) {
                console.log(error);
                setError('Error!');
            } finally {
                setIsLoading(false);
            }
        };

        if (userId) fetchProfiles();

        return () => abortController.abort();
    }, [userId]);

    return { profile, isLoading, error, setProfile };
};

export { useProfiles };
