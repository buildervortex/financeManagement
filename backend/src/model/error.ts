import Joi from "joi";


export class Error {
    error: string

    constructor(message: string) {
        this.error = message;
    }

    getError() {
        return {
            error: this.error
        };
    }
}

function errorMessage(error: Joi.ValidationError): Error {
    let errorMessage: string = error.details.map(detail => detail.message.replace(/\"/g, "'")).join(" , ").toString();
    return new Error(errorMessage);
}

export default errorMessage