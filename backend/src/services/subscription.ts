import AddExpenseDto from "../dto/expense/addExpenseDto";
import ISubscriptionService from "../interfaces/subscriptionService";
import Account from "../model/account";
import Expense from "../model/expense";
import Subscription from "../model/subscriptions";
import ExpenseRepository from "../repositories/expenseRepository";
import SubscrpitionRepository from "../repositories/subscriptionRepository";
import SubscriptionUtils from "../util/subscriptionUtils";

const expenseRepository = new ExpenseRepository();
const subscriptionRepository = new SubscrpitionRepository();

export default class SubscriptionService implements ISubscriptionService {
    async paySubscription(subscriptionId: string, accountId: string): Promise<Expense> {
        let subscription = await subscriptionRepository.getSubscription(subscriptionId, accountId);

        if (!SubscriptionUtils.validateSubscription(subscription)) throw new Error("There is no remaining installments to pay");

        let expense: Expense = SubscriptionUtils.subscriptionToExpense(subscription);

        let updatedSubscription: Subscription = SubscriptionUtils.paySubscription(subscription);

        await subscriptionRepository.updateSubscription(updatedSubscription, subscriptionId, accountId);

        return expenseRepository.addExpense(expense, accountId);
    }

    async handleSubscriptionDueDates(accountId: string) {
        let subscriptions = await subscriptionRepository.getSubscriptions(accountId);
    }

}