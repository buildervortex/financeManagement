import NotificationDto from "../dtos/notification/notification";
import ErrorMessage from "./error";
import notificationService from "../services/notificationService";

export default class NotificationViewModel {
    async getNotification(id: string): Promise<NotificationDto | ErrorMessage> {
        const response = await notificationService.getNotification(id);
        if (response && typeof response === 'object' && 'error' in response) {
            return ErrorMessage.errorMessageFromString(response.error);
        }
        return response;
    }
    async getNotifications(): Promise<NotificationDto[] | ErrorMessage> {
        const response = await notificationService.getNotifications();
        if (response && typeof response === 'object' && 'error' in response) {
            return ErrorMessage.errorMessageFromString(response.error);
        }
        return response;
    }
    async DeleteNotification(id: string): Promise<NotificationDto | ErrorMessage> {
        const response = await notificationService.deleteNotification(id);
        if (response && typeof response === 'object' && 'error' in response) {
            return ErrorMessage.errorMessageFromString(response.error);
        }
        return response;
    }
    async ReadNotification(id: string): Promise<NotificationDto | ErrorMessage> {
        const response = await notificationService.readNotification(id);
        if (response && typeof response === 'object' && 'error' in response) {
            return ErrorMessage.errorMessageFromString(response.error);
        }
        return response;
    }

    async ReadAllNotifications(): Promise<any | ErrorMessage> {
        const response = await notificationService.readNotifications();
        if (response && typeof response === 'object' && 'error' in response) {
            return ErrorMessage.errorMessageFromString(response.error);
        }
        return response;
    }
    async DeleteUnReadNotifications(): Promise<any | ErrorMessage> {
        const response = await notificationService.deleteUnReadNotifications();
        if (response && typeof response === 'object' && 'error' in response) {
            return ErrorMessage.errorMessageFromString(response.error);
        }
        return response;
    }

}