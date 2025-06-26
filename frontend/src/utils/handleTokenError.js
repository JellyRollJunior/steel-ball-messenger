const handleTokenError = (error, navigate) => {
    if (error && error.message == 'Invalid or expired token.') {
        localStorage.removeItem('token');
        navigate('/login');
    }
};

export { handleTokenError };
