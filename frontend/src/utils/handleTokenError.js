import { logout } from "./logout.js";

const handleTokenError = (error, navigate) => {
    if (error && error.message == 'Invalid or expired token.') {
        logout(navigate);
    }
};

export { handleTokenError };
