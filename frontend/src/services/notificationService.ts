import NotificationDto from "../dtos/notification/notification";
import ErrorMessage from "../viewModels/error";
import Cast from "../utils/cast";
import Api from "./api";

export default class notificationService {
    static async getNotifications(): Promise<NotificationDto[] | ErrorMessage> {
        const response = await Api.get<NotificationDto[] | ErrorMessage>(`/accounts/notifications/`);
        return Cast.errorMessageCast(response);
    }

    static async getNotification(id: string): Promise<NotificationDto | ErrorMessage> {
        const response = await Api.get<NotificationDto | ErrorMessage>(`/accounts/notifications/${id}`);
        return Cast.errorMessageCast(response);
    }

    static async deleteNotification(id: String): Promise<NotificationDto | ErrorMessage> {
        const response = await Api.delete<NotificationDto | ErrorMessage>(`/accounts/notifications/${id}`);
        return Cast.errorMessageCast(response);
    }

    static async readNotification(id: string): Promise<NotificationDto | ErrorMessage> {
        const response = await Api.post<NotificationDto | ErrorMessage>(`/accounts/notifications/${id}/read`);
        return Cast.errorMessageCast(response);
    }

    static async readNotifications(): Promise<any | ErrorMessage> {
        const response = await Api.post<ErrorMessage | any>("/accounts/notifications/read");
        return Cast.errorMessageCast(response);
    }
    static async deleteUnReadNotifications(): Promise<any | ErrorMessage> {
        const response = await Api.delete<ErrorMessage | any>("/accounts/notifications/");
        return Cast.errorMessageCast(response);
    }
}