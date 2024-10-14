import AddGoalDto, { validateAddGoalDto } from "../dtos/goal/addGoalDto";
import AddGoalPaymentDto, { validateAddGoalPaymentDto } from "../dtos/goal/addGoalPaymentDto";
import GoalDto from "../dtos/goal/goalDto";
import GoalPaymentDto from "../dtos/goal/goalPaymentDto";
import UpdateGoalDto, { validateUpdateGoalDto } from "../dtos/goal/updateGoalDto";
import ErrorMessage from "./error";
import goalService from "../services/goalService";
import IncomeDto from "../dtos/income/incomeDto";

export default class GoalsViewModel{
    
    async addGoal(addGoalDto:AddGoalDto): Promise<GoalDto | ErrorMessage>{
        const{error} = validateAddGoalDto(addGoalDto); 
        if(error)
            return ErrorMessage.errorMessageFromJoiError(error);
        const response = await goalService.addGoal(addGoalDto);
        if(response && typeof response === 'object' && 'error' in response) {
            return ErrorMessage.errorMessageFromString(response.error);
        }
        return response;
    }
    async addGoalPayment(addGoalPaymentDto:AddGoalPaymentDto,id:string): Promise<GoalPaymentDto | ErrorMessage>{
        const{error} = validateAddGoalPaymentDto(addGoalPaymentDto); 
        if(error)
            return ErrorMessage.errorMessageFromJoiError(error);
        const response = await goalService.addGoalPayment(addGoalPaymentDto,id);
        if(response && typeof response === 'object' && 'error' in response) {
            return ErrorMessage.errorMessageFromString(response.error);
        }
        return response;
    }
    async updateGoal(updateGoalDto:UpdateGoalDto,id:string): Promise<GoalDto | ErrorMessage>{
        const{error} = validateUpdateGoalDto(updateGoalDto); 
        if(error)
            return ErrorMessage.errorMessageFromJoiError(error);
        const response = await goalService.updateGoal(updateGoalDto,id);
        if(response && typeof response === 'object' && 'error' in response) {
            return ErrorMessage.errorMessageFromString(response.error);
        }
        return response;
    }
    async DeleteGoal(id: string): Promise<GoalDto | ErrorMessage> {
        const response = await goalService.deleteGoal(id);
        if (response && typeof response === 'object' && 'error' in response) {
            return ErrorMessage.errorMessageFromString(response.error);
        }
        return response;
    }
    async getGoals(): Promise<GoalDto[] | ErrorMessage> {
        const response = await goalService.getGoals();
        if (response && typeof response === 'object' && 'error' in response) {
            return ErrorMessage.errorMessageFromString(response.error);
        }
        return response;
    }
    async getGoal(id: string): Promise<GoalDto | ErrorMessage> {
        const response = await goalService.getGoal(id);
        if (response && typeof response === 'object' && 'error' in response) {
            return ErrorMessage.errorMessageFromString(response.error);
        }
        return response;
    }
    async getGoalPayments(id: string): Promise<IncomeDto[] | ErrorMessage> {
        const response = await goalService.getGoalPayments(id);
        if (response && typeof response === 'object' && 'error' in response) {
            return ErrorMessage.errorMessageFromString(response.error);
        }
        return response;
    }

}