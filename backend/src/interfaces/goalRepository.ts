import Goal from "../model/goal";

export default interface IGoalRepository {
    addGoal(goal: Goal, accountId: string): Promise<Goal>;
    getGoals(accountId: string): Promise<Goal[]>;
    getGoal(goalId: string, accoutnId: string): Promise<Goal>;
    updateGoal(newGoal: Goal, goalId: string, accountId: string): Promise<Goal>;
    deleteGoal(goalId: string, accountId: string): Promise<Goal>;
}