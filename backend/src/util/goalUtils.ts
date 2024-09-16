import Goal, { GoalPayment } from "../model/goal";


export default class GoalUtils {
    static payGoal(goal: Goal, goalPayment: GoalPayment): Goal {
        // let goalPayment: GoalPayment = GoalUtils.createGoalPayment(goal,amount);
        let totalPayment: number = goal.goalPayments.length !==0 ? goal.goalPayments.map(payment => payment.amount).reduce((acc, next) => acc += next) : 0;

        if (totalPayment + goalPayment.amount >= goal.targetAmount) {
            goal.isAchieved = true;
        }
        goal.goalPayments.push(goalPayment);
        goal.lastPaymentDate = goalPayment.paymentDate;
        goal.currentAmount += goalPayment.amount;

        return goal;
    }
}