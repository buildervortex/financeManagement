import ErrorMessage from "../viewModels/error";

export default class Cast {

    static errorMessageCast(response: any): any {
        if ("error" in response) {
            return new ErrorMessage(response.data.error);
        }
        return response.data
    }
}