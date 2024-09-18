import Subscription from "../model/subscriptions";

export default interface ISubscryptionRepository {
    addSubscription(subscription: Subscription, accountId: string): Promise<Subscription>;
    getSubscriptions(accountId: string): Promise<Subscription[]>;
    getSubscription(subscriptionId: string, accountId: string): Promise<Subscription>;
    updateSubscription(subscription: Subscription, subscriptionId: string, accountId: string): Promise<Subscription>;
    deleteSubscription(subscriptionId: string, accountId: string): Promise<Subscription>;
}