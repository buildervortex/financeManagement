import mongoose from "mongoose";
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

    async getAllCategories(accountId: string): Promise<String[]> {
        let existingAccount = await Account.findById(accountId);
        if (!existingAccount) {
            throw new Error("Account not found")
        }

        const categories = await Account.aggregate(createGetAllCategoriesAggregationPipeline(accountId));
        return categories[0]["categories"];
    }
    async updateSubscription(newSubscription: Subscription, subscriptionId: string, accountId: string): Promise<Subscription> {
        let existingAccount = await Account.findById(accountId);
        if (!existingAccount) {
            throw new Error("Account not found")
        }

        const subscriptionIndex = existingAccount.subscriptions.findIndex(subscription => subscription.id === subscriptionId);

        if (subscriptionIndex === -1) {
            throw new Error("Subscription not found");
        }

        let existingSubscription: Subscription = existingAccount.subscriptions[subscriptionIndex];
        newSubscription._id = existingSubscription._id;

        const updatedSubscription = existingSubscription.set(newSubscription.toObject());

        await existingAccount.save();
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

// db.Account.aggregate([{ $match: { _id: ObjectId('66e527d92ac79c820aeaedb3') } },{$unwind: "$subscriptions"}, {$group: {_id:null, categories:{$addToSet:"$subscriptions.category"}}},{$project: {_id:0, categories:1}}])
function createGetAllCategoriesAggregationPipeline(accountId: string): any {
    const pipeline: any[] = [];

    // select the account
    pipeline.push({
        $match: {
            _id: new mongoose.Types.ObjectId(accountId),
        },
    });

    // unwind expenses
    pipeline.push({
        $unwind: "$subscriptions"
    });

    // group the expenses
    pipeline.push({
        $group: { _id: null, categories: { $addToSet: "$subscriptions.category" } }
    })

    // project the categories
    pipeline.push({
        $project: { _id: 0, categories: 1 }
    })

    return pipeline;
}