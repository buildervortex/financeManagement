import Goal from "../model/goal";
import Notification from "../model/notification";
import Subscription from "../model/subscriptions";
import GoalUtils from "./goalUtils";
import SubscriptionUtils from "./subscriptionUtils";

export default class NotificationUtils {
    static getSubscriptionNotifications(subscriptions: Subscription[]): Notification[] {
        return subscriptions.filter(subscription => SubscriptionUtils.isNearToNextInstallment(subscription)).map(subscription => this.subscriptionToNotification(subscription));
    }

    static subscriptionToNotification(subscription: Subscription): Notification {
        const notification: Notification = new Notification();
        notification.content = `Remaining days to pay the ${subscription.name} named subscription is ${SubscriptionUtils.getEffectiveRemainingDaysToNextInstallment(subscription)}`;
        notification.date = new Date();
        notification.read = false;
        notification.type = "subscription"
        return notification;
    }

    static getGoalNotifications(goals: Goal[]): Notification[] {
        return goals.filter(goal => GoalUtils.isNearToDeadline(goal)).map(goal => this.goalToNotification(goal));
    }

    static goalToNotification(goal: Goal): Notification {
        const notification: Notification = new Notification();
        notification.content = `Remaining days to pay the ${goal.name} named goal is ${GoalUtils.getEffectiveDaysToInstallment(goal)}`;
        notification.date = new Date();
        notification.read = false;
        notification.type = "goal"
        return notification;
    }

    static readNotification(notification: Notification):Notification {
        notification.read = true;
        return notification;
    }

}