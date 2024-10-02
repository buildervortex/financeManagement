import AddGoalDto from "../dtos/goal/addGoalDto";
import AddGoalPaymentDto from "../dtos/goal/addGoalPaymentDto";
import GoalDto from "../dtos/goal/goalDto";
import GoalPaymentDto from "../dtos/goal/goalPaymentDto";
import UpdateGoalDto from "../dtos/goal/updateGoalDto";
import Cast from "../utils/cast";
import ErrorMessage from "../viewModels/error";
import Api from "./api";

export default class goalService{
    static async addGoal(addGoalDto : AddGoalDto) : Promise<GoalDto | ErrorMessage> {
        const response = await Api.post<GoalDto | ErrorMessage> ("/goals", addGoalDto);
        return Cast.errorMessageCast(response);
    }

    static async  addGoalPayment (addGoalPaymentDto : AddGoalPaymentDto, id : string) : Promise<GoalPaymentDto | ErrorMessage>{
        const response = await Api.post<GoalDto | ErrorMessage> (`/goals/${id}/pay`,addGoalPaymentDto);
        return Cast.errorMessageCast(response);
    }

    static async getGoals() :Promise<GoalDto[] | ErrorMessage>{
        const response=  await Api.get<GoalDto[] | ErrorMessage> (`/goals/`);
        return Cast.errorMessageCast(response);
    }

    static async getGoal(id : string) :Promise<GoalDto | ErrorMessage>{
        const response = await Api.get<GoalDto | ErrorMessage> (`/goals/${id}`);
        return Cast.errorMessageCast(response);
    }

    static async updateGoal(updateGoalDto : UpdateGoalDto, id : string): Promise<UpdateGoalDto | ErrorMessage>{
        const response = await Api.put<UpdateGoalDto | ErrorMessage> (`/goals/${id}`,updateGoalDto);
        return Cast.errorMessageCast(response);
    }

    static async deleteGoal(id : string): Promise<GoalDto | ErrorMessage>{
        const response = await Api.delete<GoalDto | ErrorMessage> (`/goals/${id}`);
        return Cast.errorMessageCast(response);
    }

    



}