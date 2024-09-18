import Notification from "../model/notification";

export default interface INotificationRepository {
    getNotifications(accountId: string): Promise<Notification[]>;
    getNotification(accountId: string, notificationId: string): Promise<Notification>;
    updateNotification(accountId: string, notificationId: string, newNotification:Notification): Promise<Notification>;
    deleteNotification(accountId: string, notificationId: string): Promise<Notification>;
}