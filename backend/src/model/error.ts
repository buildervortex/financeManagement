import Joi from "joi";


export default class ErrorMessage {

    static errorMessageFromJoiError(error: Joi.ValidationError): ErrorMessage {
        let errorMessage: string = error.details.map(detail => detail.message.replace(/\"/g, "'")).join(" , ").toString();
        return { error: errorMessage };
    }

    static errorMessageFromString(error: string) {
        return {
            error
        }
    }

    static ServerError = { error: "Internal Server Error" };
    static ObjectIdError = { error: "The Id is invalid" };
}
