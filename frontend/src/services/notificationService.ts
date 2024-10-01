import { promises } from "dns";
import NotificationDto from "../dtos/notification/notification";
import ErrorMessage from "../viewModels/error";
import Cast from "../utils/cast";
import Api from "./api";

export default class notificationService{
    static async getNotifications(): Promise<NotificationDto[] | ErrorMessage>{
        const response =  await Api.get<NotificationDto[] | ErrorMessage>(`/accounts/notification/`);
        return Cast.errorMessageCast(response);
    }

    static async getNotification(getNotificationDto : NotificationDto, id : string): Promise<NotificationDto | ErrorMessage>{
        const response = await Api.get<NotificationDto | ErrorMessage>(`/accounts/notification/${id}`);
        return Cast.errorMessageCast(response);
    }

    static async deleteNotification(deleteNotification : NotificationDto, id : String): Promise<NotificationDto | ErrorMessage>{
        const response = await Api.delete<NotificationDto | ErrorMessage>(`/accounts/notification/${id}`);
        return Cast.errorMessageCast(response);
    }

    static async addNotification(addNotificationDto : NotificationDto) : Promise<NotificationDto | ErrorMessage>{
        const response = await Api.post<NotificationDto | ErrorMessage>("/accounts/notification");
        return Cast.errorMessageCast(response);
    }
}