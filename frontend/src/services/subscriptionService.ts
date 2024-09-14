import ExpenseDto from "../dtos/expense/expenseDto";
import UpdateExpenseDto from "../dtos/expense/updateExpenseDto";
import AddSubscriptionDto from "../dtos/subscription/addSubscriptionDto";
import SubscriptionDto from "../dtos/subscription/subscriptionDto";
import Cast from "../utils/cast";
import ErrorMessage from "../viewModels/error";
import Api from "./api";


export default class SubscriptionService{
    static async addSubscription (addSubscriptionDto : AddSubscriptionDto) : Promise<SubscriptionDto | ErrorMessage> {
        const response = await Api.post<SubscriptionDto | ErrorMessage>("/subscriptions", addSubscriptionDto);
        return Cast.errorMessageCast(response);
    }

    static async updateSubscription(updateSubscriptionDto : UpdateExpenseDto ,id: string) :  Promise<SubscriptionDto | ErrorMessage>{
        const response = await Api.put<SubscriptionDto | ErrorMessage>(`/subscriptions/${id}`, updateSubscriptionDto);
        return Cast.errorMessageCast(response);
    }

    static async deleteSubscription(id : string): Promise<SubscriptionDto | ErrorMessage>{
        const response = await Api.delete<SubscriptionDto | ErrorMessage>(`/subscriptions/${id}`);
        return Cast.errorMessageCast(response);
    }

    static async getSubscriptions(): Promise<SubscriptionDto[] | ErrorMessage>{
        const response = await Api.get<SubscriptionDto[] | ErrorMessage>(`/subscriptions/`);
        return Cast.errorMessageCast(response);
    }

    static async getSubscription(id : string): Promise<SubscriptionDto | ErrorMessage>{
        const response = await Api.get<SubscriptionDto | ErrorMessage>(`/subscriptions/${id}`);
        return Cast.errorMessageCast(response);
    }

    static async paySubscription(id : string) : Promise<SubscriptionDto | ErrorMessage> {
        const response = await Api.post<SubscriptionDto | ErrorMessage> (`/subscriptions/${id}/pay`);
        return Cast.errorMessageCast(response);
    }

}