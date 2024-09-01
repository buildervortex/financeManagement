import Joi from "joi";


export default class ErrorMessage {

    error: string = "";

    constructor(errorMessage: string) {
        this.error = errorMessage;
    }

    static errorMessageFromJoiError(error: Joi.ValidationError): ErrorMessage {
        let errorMessage: string = error.details.map(detail => detail.message.replace(/"/g, "'")).join(" , ").toString();
        return new ErrorMessage(errorMessage);
    }

    static errorMessageFromString(error: string) {
        
        return new ErrorMessage(error);
    }

}
