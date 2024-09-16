import Goal, { GoalPayment } from "../model/goal";
import GoalRepository from "../repositories/goalRepository";
import GoalUtils from "../util/goalUtils";

const goalRepository = new GoalRepository();
export default class GoalService {
    async payGoal(goalId: string, accountId: string, goalPayment: GoalPayment): Promise<Goal> {
        let goal = await goalRepository.getGoal(goalId, accountId);
        if (goal.isAchieved) throw new Error("The goal is already achived");
        goal = GoalUtils.payGoal(goal, goalPayment);
        
        let updatedGoal: Goal = await goalRepository.updateGoal(goal, goalId, accountId);
        return updatedGoal;
    }
}