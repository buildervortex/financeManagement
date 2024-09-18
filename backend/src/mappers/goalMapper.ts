import AddGoalDto from "../dto/goal/addGoalDto";
import AddGoalPaymentDto from "../dto/goal/addGoalPaymentDto";
import GoalDto from "../dto/goal/goalDto";
import GoalPaymentDto from "../dto/goal/goalPaymentDto";
import UpdateGoalDto from "../dto/goal/updateGoalDto";
import Goal, { GoalPayment } from "../model/goal";

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
        goalDto.currencyType = goal.currencyType;
        goalDto.isAchieved = goal.isAchieved;
        goalDto.remindBeforeDays = goal.deadline && !goal.remindBeforeDays ? 1 : goal.remindBeforeDays;
        goalDto.goalPayments = goal.goalPayments.map(goalPayment => GoalMapper.ToGoalPaymentDto(goalPayment));

        return goalDto;
    }

    static ToGoalFromAddGoalDto(addGoalDto: AddGoalDto): Goal {
        const goal = new Goal();

        goal.name = addGoalDto.name!;
        goal.description = addGoalDto.description;
        goal.targetAmount = addGoalDto.targetAmount!;
        goal.startDate = addGoalDto.startDate!;
        goal.deadline = addGoalDto.deadline;
        goal.currencyType = addGoalDto.currencyType!;
        goal.remindBeforeDays = addGoalDto.remindBeforeDays;
        goal.currentAmount = 0;
        goal.isAchieved = false;

        return goal;
    }

    static ToGoalFromUpdateGoalDto(updateGoalDto: UpdateGoalDto): Goal {
        const goal = new Goal();
        goal.name = updateGoalDto.name!;
        goal.description = updateGoalDto.description;
        goal.currencyType = updateGoalDto.currencyType!;
        goal.remindBeforeDays = updateGoalDto.remindBeforeDays;
        return goal;
    }

    static ToGoalPaymentDto(goalPayment: GoalPayment): GoalPaymentDto {
        const goalPaymentDto = new GoalPaymentDto();

        goalPaymentDto.amount = goalPayment.amount;
        goalPaymentDto.paymentDate = goalPayment.paymentDate;

        return goalPaymentDto;
    }

    static ToGoalPaymentDtoFromAddGoalPaymentDto(addGoalPaymentDto: AddGoalPaymentDto): GoalPayment {
        const goalPayment = new GoalPayment();

        goalPayment.amount = addGoalPaymentDto.amount!;
        goalPayment.paymentDate = new Date();

        return goalPayment;
    }
}