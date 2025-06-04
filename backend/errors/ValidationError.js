class ValidationError extends Error {
    constructor(validationErrors, statusCode = 400) {
        super("Unable to process request data.");
        this.name = "Validation Error";
        this.validationErrors = validationErrors;
        this.statusCode = statusCode;
    }
}

export { ValidationError };
