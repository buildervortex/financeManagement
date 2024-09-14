import addSusbscriptionDto, { validateAddSubscriptionDto } from "../dtos/subscription/addSusbscriptionDto";
import SubscriptionDto from "../dtos/subscription/subscriptionDto";
import subscriptionDto from "../dtos/subscription/subscriptionDto";
import updateSubscriptionDto, { validateUpdateSubscriptionDto } from "../dtos/subscription/updateSubscriptionDto";
import ErrorMessage from "./error";


export default class SubscriptionViewModel{
    
    async addSusbscription(addSubscription: addSusbscriptionDto): Promise<subscriptionDto | ErrorMessage> {
        const { error } = validateAddSubscriptionDto(addSubscription);
        if (error)
            return ErrorMessage.errorMessageFromJoiError(error);
        const response = await SubscriptionService.addSubscription(addSubscription);
        if (response && typeof response === 'object' && 'error' in response) {
            return ErrorMessage.errorMessageFromString(response.error);
        }
        return response;
    }

    async updateSubscription(updateExpenseDto: updateSubscriptionDto, id: string): Promise<SubscriptionDto | ErrorMessage> {
        const { error } = validateUpdateSubscriptionDto(updateExpenseDto);
        if (error)
            return ErrorMessage.errorMessageFromJoiError(error);
        const response = await SubscriptionService.updateExpense(updateExpenseDto, id);
        if (response && typeof response === 'object' && 'error' in response) {
            return ErrorMessage.errorMessageFromString(response.error);
        }
        return response;
    }

    async DeleteSubscription(id: string): Promise<SubscriptionDto | ErrorMessage> {
        const response = await SubscriptionService.deleteExpense(id);
        if (response && typeof response === 'object' && 'error' in response) {
            return ErrorMessage.errorMessageFromString(response.error);
        }
        return response;
    }

    async getSubscrption(id : string): Promise<SubscriptionDto | ErrorMessage> {
        const response = await SubscrptionService.getSubscrption(id);
        if (response && typeof response === 'object' && 'error' in response) {
            return ErrorMessage.errorMessageFromString(response.error);
        }
        return response;

    }

    async getSubscription(): Promise<SubscriptionDto[] | ErrorMessage> {
        const response = await Subscriptionservice.getSubscription();
        if (response && typeof response === 'object' && 'error' in response) {
            return ErrorMessage.errorMessageFromString(response.error);
        }
        return response;
    }
}