import IGoalRepository from "../interfaces/goalRepository";
import Account from "../model/account";
import Goal from "../model/goal";

export default class GoalRepository implements IGoalRepository {
    async addGoal(goal: Goal, accountId: string): Promise<Goal> {
        let existingAccount = await Account.findById(accountId);
        if (!existingAccount)
            throw new Error("Account not found");
        existingAccount.goals.push(goal);
        const updatedAccount = await existingAccount.save();
        if (!updatedAccount) {
            throw new Error("Server error");
        }
        const addedGoal = updatedAccount.goals[updatedAccount.goals.length - 1];
        return addedGoal;
    }
    async getGoals(accountId: string): Promise<Goal[]> {
        let existingAccount = await Account.findById(accountId);
        if (!existingAccount)
            throw new Error("Account not found");
        return existingAccount.goals;
    }
    async getGoal(goalId: string, accountId: string): Promise<Goal> {
        let existingAccount = await Account.findById(accountId);
        if (!existingAccount)
            throw new Error("Account not found");
        const goal = existingAccount.goals.find(goal => goal.id === goalId);
        if (!goal)
            throw new Error("Goal not found")
        return goal;
    }
    async updateGoal(newGoal: Goal, goalId: string, accountId: string): Promise<Goal> {
        let existingAccount = await Account.findById(accountId);
        if (!existingAccount) {
            throw new Error("Account not found")
        }

        const goalIndex = existingAccount.goals.findIndex(goal => goal.id === goalId);

        if (goalIndex === -1) {
            throw new Error("Goal not found");
        }

        let existingGoal: Goal = existingAccount.goals[goalIndex];
        newGoal._id = existingGoal._id;

        const updatedGoal = existingGoal.set(newGoal.toObject());

        await existingAccount.save();
        return updatedGoal;
    }
    async deleteGoal(goalId: string, accountId: string): Promise<Goal> {
        let existingAccount = await Account.findById(accountId);
        if (!existingAccount) {
            throw new Error("Account not found")
        }
        const deletedGoal = existingAccount.goals.find(goal => goal.id === goalId);
        if (!deletedGoal) {
            throw new Error("Goal not found");
        }

        const goals = existingAccount.goals.filter(goal => goal.id !== goalId);

        existingAccount.goals = goals;
        await existingAccount.save();

        return deletedGoal;
    }

}