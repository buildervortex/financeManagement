import Expense from "../model/expense";

export default interface ISubscriptionService {
    paySubscription(subscriptionId: string, accountId: string): Promise<Expense>;
}