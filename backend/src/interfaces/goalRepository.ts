import Goal from "../model/goal";
import Income from "../model/income";

export default interface IGoalRepository {
    addGoal(goal: Goal, accountId: string): Promise<Goal>;
    getGoals(accountId: string): Promise<Goal[]>;
    getGoal(goalId: string, accoutnId: string): Promise<Goal>;
    getGoalIncomes(goalId: string, accountId: string) : Promise<Income[]>
    updateGoal(newGoal: Goal, goalId: string, accountId: string): Promise<Goal>;
    deleteGoal(goalId: string, accountId: string): Promise<Goal>;
}