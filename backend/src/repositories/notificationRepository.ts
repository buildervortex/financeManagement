import INotificationRepository from "../interfaces/notificationRepository";
import Account from "../model/account";
import Notification from "../model/notification";

export default class NotificationRepository implements INotificationRepository {
    async getNotifications(accountId: string): Promise<Notification[]> {
        let existingAccount = await Account.findById(accountId);
        if (!existingAccount)
            throw new Error("Account not found");
        return existingAccount.notification;
    }
    async getNotification(accountId: string, notificationId: string): Promise<Notification> {
        let existingAccount = await Account.findById(accountId);
        if (!existingAccount)
            throw new Error("Account not found");

        const notification = existingAccount.notification.find(notification => notification.id === notificationId);
        if (!notification)
            throw new Error("Notification not found");
        return notification;
    }
    async updateNotification(accountId: string, notificationId: string, newNotification: Notification): Promise<Notification> {
        let existingAccount = await Account.findById(accountId);
        if (!existingAccount)
            throw new Error("Account not found");

        const notificationIndex = existingAccount.goals.findIndex(notification => notification.id === notificationId);

        if (notificationIndex === -1) {
            throw new Error("Notification not found");
        }

        let existingNotification: Notification = existingAccount.notification[notificationIndex];
        newNotification._id = existingNotification._id;
        const updatedNotification = existingNotification.set(newNotification.toObject());

        await existingAccount.save();
        return updatedNotification;
    }
    async deleteNotification(accountId: string, notificationId: string): Promise<Notification> {
        let existingAccount = await Account.findById(accountId);
        if (!existingAccount)
            throw new Error("Account not found");

        const deletedNotification = existingAccount.notification.find(notification => notification.id === notificationId);
        if (!deletedNotification)
            throw new Error("Notification not found");

        const notifications = existingAccount.notification.filter(notification => notification.id !== notificationId);

        existingAccount.notification = notifications;
        await existingAccount.save();

        return deletedNotification;
    }

}