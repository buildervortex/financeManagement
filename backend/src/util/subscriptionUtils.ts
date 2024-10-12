import Expense from "../model/expense";
import Subscription from "../model/subscriptions";
import { getDifferenceInDays } from "./dates";

export default class SubscriptionUtils {
    static toPay(subscription: Subscription): boolean {
        if (subscription.totalInstallments) {
            if (subscription.completedInstallments < subscription.totalInstallments) return true;
        }
        if (subscription.isRecurringIndefinitely) {
            return true;
        }
        return false;
    }

    static paySubscription(subscription: Subscription): Subscription {
        if (!subscription.nextInstallmentDate) throw Error("The next installment date not exists");
        const nextInstallmentDate = new Date(subscription.nextInstallmentDate);
        nextInstallmentDate.setDate(subscription.nextInstallmentDate.getDate() + subscription.installmentIntervalDays);
        const previousINstallmentDate = new Date();

        subscription.nextInstallmentDate = nextInstallmentDate;
        subscription.lastPaymentDate = previousINstallmentDate;
        subscription.completedInstallments = subscription.completedInstallments + 1;
        return subscription;
    }

    static setInitialNextInstallmentDate(subscription: Subscription): Subscription {
        const nextInstallmentDate = new Date(subscription.initialPaymentDate);
        nextInstallmentDate.setDate(subscription.initialPaymentDate.getDate() + subscription.installmentIntervalDays);
        subscription.nextInstallmentDate = nextInstallmentDate;
        return subscription;
    }

    static subscriptionToExpense(subscription: Subscription, paid: boolean = true): Expense {
        let expense: Expense = new Expense();
        expense.name = subscription.name;
        expense.category = subscription.category!;
        expense.description = subscription.description!;
        expense.amount = subscription.amount;
        expense.type = "subscription";
        expense.paid = paid;
        expense.addtionalIdentifiers?.push(subscription._id);

        return expense;
    }

    static isNearToNextInstallment(subscription: Subscription): boolean {
        if (!subscription.nextInstallmentDate) return false;
        if (!subscription.isRecurringIndefinitely && subscription.completedInstallments == subscription.totalInstallments) return false;
        if (getDifferenceInDays(new Date(), subscription.nextInstallmentDate) > subscription.remindBeforeDays) return false;
        return true;
    }

    static getEffectiveRemainingDaysToNextInstallment(subscription: Subscription): number {
        if (subscription.nextInstallmentDate) return 0;
        return getDifferenceInDays(new Date(), subscription.nextInstallmentDate!);
    }
}