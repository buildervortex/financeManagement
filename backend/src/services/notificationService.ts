import GoalDto from "../dto/goal/goalDto";
import Account from "../model/account";
import Notification from "../model/notification";
import AccountRepository from "../repositories/accountRepository";
import NotificationRepository from "../repositories/notificationRepository";
import NotificationUtils from "../util/notification";

const accountRepository = new AccountRepository();
const notificationRespository = new NotificationRepository();

export default async function NotificationService() {
    const accounts = await accountRepository.getAccounts();
    accounts.forEach(async account => {
        accountNotification(account);
    })
}

export async function accountNotification(account: Account) {
    let subscriptionNotifications: Notification[] = NotificationUtils.getSubscriptionNotifications(account.subscriptions);
    let goalNotifications: Notification[] = NotificationUtils.getGoalNotifications(account.goals)
    account.notification.push(...subscriptionNotifications, ...goalNotifications)
    await account.save();
}

export async function readNotification(notificationId: string, accountId: string): Promise<Notification> {
    let notification = await notificationRespository.getNotification(notificationId, accountId);
    if (notification.read) throw new Error("The notification is already read");
    notification = NotificationUtils.readNotification(notification);

    let updatedNotification: Notification = await notificationRespository.updateNotification(accountId, notificationId, notification);
    return updatedNotification;
}