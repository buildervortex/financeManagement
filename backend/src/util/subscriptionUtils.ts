import Expense from "../model/expense";
import Subscription from "../model/subscriptions";

export default class SubscriptionUtils {
    static validateSubscription(subscription: Subscription): boolean {
        if (subscription.repeatCount) {
            if (subscription.paidInstallments < subscription.repeatCount) return true;

        }
        return false;
    }

    static paySubscription(subscription: Subscription): Subscription {
        if (!subscription.nextInstallmentDate) throw Error("The next installment date not exists");
        const nextInstallmentDate = new Date(subscription.nextInstallmentDate);
        nextInstallmentDate.setDate(subscription.nextInstallmentDate.getDate() + subscription.duration);
        const previousINstallmentDate = new Date();

        subscription.nextInstallmentDate = nextInstallmentDate;
        subscription.previousInstalmentDate = previousINstallmentDate;
        subscription.paidInstallments = subscription.paidInstallments + 1;
        return subscription;
    }

    static setInitialNextInstallmentDate(subscription: Subscription): Subscription {
        const nextInstallmentDate = new Date(subscription.installmentStartingDate);
        nextInstallmentDate.setDate(subscription.installmentStartingDate.getDate() + subscription.duration);
        subscription.nextInstallmentDate = nextInstallmentDate;
        return subscription;
    }

    static subscriptionToExpense(subscription: Subscription): Expense {
        let expense: Expense = new Expense();
        expense.name = subscription.name;
        expense.category = subscription.category!;
        expense.description = subscription.description!;
        expense.amount = subscription.amount;
        expense.currencyType = subscription.currencyType;
        expense.type = "subscription";
        expense.paid = true;
        expense.addtionalIdentifiers?.push(subscription._id);

        return expense;
    }
}