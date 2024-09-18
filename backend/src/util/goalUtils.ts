import Goal, { GoalPayment } from "../model/goal";
import { getDifferenceInDays } from "./dates";


export default class GoalUtils {
    static payGoal(goal: Goal, goalPayment: GoalPayment): Goal {
        let totalPayment: number = goal.goalPayments.length !== 0 ? goal.goalPayments.map(payment => payment.amount).reduce((acc, next) => acc += next) : 0;

        if (totalPayment + goalPayment.amount >= goal.targetAmount) {
            goal.isAchieved = true;
        }
        goal.goalPayments.push(goalPayment);
        goal.lastPaymentDate = goalPayment.paymentDate;
        goal.currentAmount += goalPayment.amount;

        return goal;
    }

    static isNearToDeadline(goal: Goal): boolean {
        if (goal.isAchieved || !goal.deadline || !goal.remindBeforeDays) return false;
        if (getDifferenceInDays(new Date(), goal.deadline) > goal.remindBeforeDays) return false;
        return true;
    }

    static getEffectiveDaysToInstallment(goal: Goal): number {
        if (!goal.deadline) return 0;
        return getDifferenceInDays(new Date(), goal.deadline)
    }
}