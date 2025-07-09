import { useState, useEffect } from 'react';
import { makeRequest } from '../utils/requests.js';
import { getUrl } from '../utils/serverUrl.js';
import { useNavigate } from 'react-router';
import { handleTokenError } from '../utils/handleTokenError.js';

const useProfiles = (userId) => {
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

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
                handleTokenError(error, navigate);
                setError(error.message ? error.message : error.name);
            } finally {
                setIsLoading(false);
            }
        };

        if (userId) fetchProfiles();

        return () => abortController.abort();
    }, [userId, navigate]);

    return { profile, isLoading, error, setProfile };
};

export { useProfiles };
