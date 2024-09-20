import NotificationDto from "../dto/notification/notification";
import Notification from "../model/notification";

export default class NotificationMapper {
    static ToNotificationDto(notification: Notification): NotificationDto {
        const notificationDto: NotificationDto = new NotificationDto();

        notificationDto._id = notification.id;
        notification.content = notification.content;
        notification.date = notification.date;
        notification.read = notification.read;
        notification.type = notification.type;

        return notificationDto;
    }
}