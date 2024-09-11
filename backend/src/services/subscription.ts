import AddExpenseDto from "../dto/expense/addExpenseDto";
import ISubscriptionService from "../interfaces/subscriptionService";
import Account from "../model/account";
import Expense from "../model/expense";
import ExpenseRepository from "../repositories/expenseRepository";
import SubscrpitionRepository from "../repositories/subscriptionRepository";
import SubscriptionUtils from "../util/subscriptionUtils";

const expenseRepository = new ExpenseRepository();
const subscriptionRepository = new SubscrpitionRepository();

export default class SubscriptionService implements ISubscriptionService {
    async paySubscription(subscriptionId: string, accountId: string): Promise<Expense> {
        let subscription = await subscriptionRepository.getSubscription(subscriptionId, accountId);

        if (!SubscriptionUtils.validateSubscription(subscription)) throw new Error("There is no remaining installments to pay");

        let expense: Expense = new Expense();
        expense.name = subscription.name;
        expense.category = subscription.category!;
        expense.description = subscription.description!;
        expense.amount = subscription.amount;
        expense.currencyType = subscription.currencyType;
        expense.type = "subscription";
        expense.paid = true;
        expense.addtionalIdentifiers?.push(subscription._id);

        await subscriptionRepository.updateSubscription(SubscriptionUtils.paySubscription(subscription), subscriptionId, accountId);

        return expenseRepository.addExpense(expense, accountId);
    }

}