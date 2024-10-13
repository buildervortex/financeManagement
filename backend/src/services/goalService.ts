import Goal from "../model/goal";
import Income from "../model/income";
import GoalRepository from "../repositories/goalRepository";
import IncomeRepository from "../repositories/incomeRepository";
import GoalUtils from "../util/goalUtils";

const goalRepository = new GoalRepository();
const incomeRepository = new IncomeRepository();

export default class GoalService {
    async payGoal(goalId: string, accountId: string, amount: number): Promise<Income> {
        let goal = await goalRepository.getGoal(goalId, accountId);
        if (goal.isAchieved) throw new Error("The goal is already achived")
        else if (goal.deadline) {
            if ((new Date()) > goal.deadline) throw new Error("The goal is already expired");
        }

        goal = GoalUtils.payGoal(goal, amount);

        let income = new Income();
        income.name = `The payment of goal named ${goal.name}`
        income.description = `The payment of the goal`
        income.amount = amount;
        income.incomeDate = new Date();
        income.monthly = false;
        income.type = "goal"

        let addedIncome: Income = await incomeRepository.addIncome(income, accountId);

        goal.incomesIds.push(addedIncome._id);
        await goalRepository.updateGoal(goal, goalId, accountId);

        return addedIncome;
    }
}