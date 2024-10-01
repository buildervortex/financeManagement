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

    static async getNotification( id : string): Promise<NotificationDto | ErrorMessage>{
        const response = await Api.get<NotificationDto | ErrorMessage>(`/accounts/notification/${id}`);
        return Cast.errorMessageCast(response);
    }

    static async deleteNotification( id : String): Promise<NotificationDto | ErrorMessage>{
        const response = await Api.delete<NotificationDto | ErrorMessage>(`/accounts/notification/${id}`);
        return Cast.errorMessageCast(response);
    }

    static async readNotification(id : string) : Promise<NotificationDto | ErrorMessage>{
        const response = await Api.post<NotificationDto | ErrorMessage>(`/accounts/notification/${id}/read`);
        return Cast.errorMessageCast(response);
    }
}