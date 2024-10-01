import NotificationDto from "../dtos/notification/notification";
import ErrorMessage from "./error";

export default class NotificationViewModel {
    async notification(id : string): Promise<NotificationDto | ErrorMessage> {
        const response = await NotificationService.notification(id);
        if (response && typeof response === 'object' && 'error' in response) {
            return ErrorMessage.errorMessageFromString(response.error);
        }
        return response;

    }
}