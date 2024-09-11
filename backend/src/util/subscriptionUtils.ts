import Subscription from "../model/subscriptions";

export default class SubscriptionUtils {
    static validateSubscription(subscription: Subscription): boolean {
        if (subscription.repeatCount) {
            if (subscription.paidInstallments < subscription.repeatCount) return false;

        }
        return true;
    }

    static paySubscription(subscription: Subscription): Subscription {
        // nextInstallmentDate
        // previousInstalmentDate
        // installmentStartingDate
        // remainingInstallments
        return subscription;
    }

    static setInitialNextInstallmentDate(subscription: Subscription): Subscription {
        const nextInstalmentDate = new Date(subscription.installmentStartingDate);
        nextInstalmentDate.setDate(subscription.installmentStartingDate.getDate() + subscription.duration);
        subscription.nextInstallmentDate = nextInstalmentDate;
        return subscription;
    }
}