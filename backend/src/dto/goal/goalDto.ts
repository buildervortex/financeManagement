import GoalPaymentDto from "./goalPaymentDto";

class GoalDto {
    id?: string;
    name?: string;
    description?: string;
    targetAmount?: number;
    currentAmount?: number;
    startDate?: Date;
    deadline?: Date;
    lastPaymentDate?: Date;
    isAchieved?: boolean;
    remindBeforeDays?: number;
    goalPayments?: Array<GoalPaymentDto>;
}

export default GoalDto;