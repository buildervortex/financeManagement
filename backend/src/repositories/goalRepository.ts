import mongoose from "mongoose";
import IGoalRepository from "../interfaces/goalRepository";
import Account from "../model/account";
import Goal from "../model/goal";
import Income from "../model/income";

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
    async getGoalIncomes(goalId: string, accountId: string): Promise<Income[]> {
        let existingAccount = await Account.findById(accountId);
        if (!existingAccount) {
            throw new Error("Account not found")
        }

        const goalIndex = existingAccount.goals.findIndex(goal => goal.id === goalId);

        if (goalIndex === -1) {
            throw new Error("Goal not found");
        }

        const incomes = await Account.aggregate(createGetAllGoalIncomesAggregationPipeline(accountId, goalId));
        return incomes[0]["goalIncomes"]

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
/*
db.Account.aggregate([
{$match: {_id: ObjectId("670cae4f74e9b2539cac59d8")}},
{$unwind: "$goals"},
{$match: {"goals._id":ObjectId('670ccaa418cca40ab9a67e86')}},
{$addFields: {goalIncomes:{$filter: {input: "$incomes", as: "income", cond: {$in: ["$$income._id", "$goals.incomesIds"]}}}}},
{$project: {"goalIncomes":1, _id:0}}])
*/
function createGetAllGoalIncomesAggregationPipeline(accountId: string, goalId: string): any {
    const pipeline: any[] = [];

    // select the account
    pipeline.push({
        $match: {
            _id: new mongoose.Types.ObjectId(accountId)
        }
    })

    // unwind the goals
    pipeline.push({
        $unwind: "$goals"
    })

    // select the specific goal
    pipeline.push({
        $match: { "goals._id": new mongoose.Types.ObjectId(goalId) }
    })

    // filter the incomes and add to a field.
    pipeline.push({
        $addFields: { goalIncomes: { $filter: { input: "$incomes", as: "income", cond: { $in: ["$$income._id", "$goals.incomesIds"] } } } }
    })

    // project only the incomes
    pipeline.push({
        $project: { "goalIncomes": 1, _id: 0 }
    })

    return pipeline
}