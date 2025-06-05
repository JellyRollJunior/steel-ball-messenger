const BASE_URL = 'http://localhost:3000';

const getUrl = (endpoint) => {
    return `${BASE_URL}${endpoint}`;
};

export { getUrl };
