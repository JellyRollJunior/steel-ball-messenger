const makeRequest = async (endpoint, options) => {
    const response = await fetch(endpoint, options);
    const json = await response.json();
    if (!response.ok) {
        const error = new Error();
        error.statusCode = json.status;
        error.name = json.name;
        error.message = json.message;
        if (json.validationErrors) {
            error.validationErrors = json.validationErrors;
        }
        throw error;
    }
    return json;
};

export { makeRequest };
