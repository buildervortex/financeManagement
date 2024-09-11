import ISubscryptionRepository from "../interfaces/subscriptionRepository";
import Account from "../model/account";
import Subscription from "../model/subscriptions";

export default class SubscrpitionRepository implements ISubscryptionRepository {
    async addSubscription(subscription: Subscription, accountId: string): Promise<Subscription> {
        let existingAccount = await Account.findById(accountId);
        if (!existingAccount) {
            throw new Error("Account not found")
        }
        existingAccount.subscriptions.push(subscription);
        const updatedAccount = await existingAccount.save();
        if (!updatedAccount) {
            throw new Error("Server error");
        }

        const addedSubscription = updatedAccount.subscriptions[updatedAccount.subscriptions.length - 1];
        return addedSubscription;
    }
    async getSubscriptions(accountId: string): Promise<Subscription[]> {
        let existingAccount = await Account.findById(accountId);
        if (!existingAccount) {
            throw new Error("Account not found")
        }

        return existingAccount.subscriptions;
    }
    async getSubscription(subscriptionId: string, accountId: string): Promise<Subscription> {
        let existingAccount = await Account.findById(accountId);
        if (!existingAccount) {
            throw new Error("Account not found")
        }
        const subscription = existingAccount.subscriptions.find(subscription => subscription.id === subscriptionId);
        if (!subscription) {
            throw new Error("Subscription not found");
        }
        return subscription;
    }
    async updateSubscription(newSubscription: Partial<Subscription>, subscriptionId: string, accountId: string): Promise<Subscription> {
        let existingAccount = await Account.findById(accountId);
        if (!existingAccount) {
            throw new Error("Account not found")
        }

        const subscriptionIndex = existingAccount.subscriptions.findIndex(subscription => subscription.id == subscriptionId);

        if (subscriptionIndex === -1) {
            throw new Error("Subscription not found");
        }

        existingAccount.subscriptions[subscriptionIndex].set(newSubscription);
        const updatedAccount = await existingAccount.save();

        const updatedSubscription = updatedAccount.subscriptions[subscriptionIndex];
        return updatedSubscription;
    }
    async deleteSubscription(subscriptionId: string, accountId: string): Promise<Subscription> {
        let existingAccount = await Account.findById(accountId);
        if (!existingAccount) {
            throw new Error("Account not found")
        }
        const deletedSubscription = existingAccount.subscriptions.find(subscription => subscription.id === subscriptionId);
        if (!deletedSubscription) {
            throw new Error("Subscription not found");
        }

        const subscriptions = existingAccount.subscriptions.filter(subscription => subscription.id !== subscriptionId);

        existingAccount.subscriptions = subscriptions;
        await existingAccount.save();

        return deletedSubscription;
    }

}