import AddGoalDto from "../dto/goal/addGoalDto";
import GoalDto from "../dto/goal/goalDto";
import UpdateGoalDto from "../dto/goal/updateGoalDto";
import Goal from "../model/goal";

export default class GoalMapper {
    static ToGoalDto(goal: Goal): GoalDto {
        const goalDto = new GoalDto();

        goalDto.id = goal.id;
        goalDto.name = goal.name;
        goalDto.description = goal.description;
        goalDto.targetAmount = goal.targetAmount;
        goalDto.currentAmount = goal.currentAmount;
        goalDto.startDate = goal.startDate;
        goalDto.deadline = goal.deadline;
        goalDto.lastPaymentDate = goal.lastPaymentDate;
        goalDto.isAchieved = goal.isAchieved;
        goalDto.remindBeforeDays = goal.deadline && !goal.remindBeforeDays ? 1 : goal.remindBeforeDays;

        return goalDto;
    }

    static ToGoalFromAddGoalDto(addGoalDto: AddGoalDto): Goal {
        const goal = new Goal();

        goal.name = addGoalDto.name!;
        goal.description = addGoalDto.description;
        goal.targetAmount = addGoalDto.targetAmount!;
        goal.startDate = addGoalDto.startDate!;
        goal.deadline = addGoalDto.deadline;
        goal.remindBeforeDays = addGoalDto.remindBeforeDays;
        goal.currentAmount = 0;
        goal.isAchieved = false;

        return goal;
    }

    static ToGoalFromUpdateGoalDto(updateGoalDto: UpdateGoalDto): Goal {
        const goal = new Goal();
        goal.name = updateGoalDto.name!;
        goal.description = updateGoalDto.description;
        goal.remindBeforeDays = updateGoalDto.remindBeforeDays;
        return goal;
    }
}