import NotificationDto from "../dto/notification/notification";
import Notification from "../model/notification";

export default class NotificationMapper {
    static ToNotificationDto(notification: Notification): NotificationDto {
        const notificationDto: NotificationDto = new NotificationDto();

        notificationDto._id = notification.id;
        notificationDto.content = notification.content;
        notificationDto.date = notification.date;
        notificationDto.read = notification.read;
        notificationDto.type = notification.type;

        return notificationDto;
    }
}