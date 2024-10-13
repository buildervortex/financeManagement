import Goal from "../model/goal";
import { getDifferenceInDays } from "./dates";


export default class GoalUtils {
    static payGoal(goal: Goal, amount: number): Goal {
        if (goal.isAchieved) throw new Error("The goal is already achived");

        if (Number(goal.currentAmount) + Number(amount) >= Number(goal.targetAmount)) {
            goal.isAchieved = true;
        }

        goal.lastPaymentDate = new Date();
        goal.currentAmount = Number(goal.currentAmount) + Number(amount);

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