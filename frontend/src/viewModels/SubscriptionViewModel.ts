import addSusbscriptionDto, { validateAddSubscriptionDto } from "../dtos/subscription/addSubscriptionDto";
import SubscriptionDto from "../dtos/subscription/subscriptionDto";
import updateSubscriptionDto, { validateUpdateSubscriptionDto } from "../dtos/subscription/updateSubscriptionDto";
import SubscriptionService from "../services/subscriptionService";
import ErrorMessage from "./error";


export default class SubscriptionViewModel{
    
    async addSusbscription(addSubscription: addSusbscriptionDto): Promise<SubscriptionDto | ErrorMessage> {
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
        const response = await SubscriptionService.updateSubscription(updateExpenseDto, id);
        if (response && typeof response === 'object' && 'error' in response) {
            return ErrorMessage.errorMessageFromString(response.error);
        }
        return response;
    }

    async DeleteSubscription(id: string): Promise<SubscriptionDto | ErrorMessage> {
        const response = await SubscriptionService.deleteSubscription(id);
        if (response && typeof response === 'object' && 'error' in response) {
            return ErrorMessage.errorMessageFromString(response.error);
        }
        return response;
    }

    async getSubscription(id : string): Promise<SubscriptionDto | ErrorMessage> {
        const response = await SubscriptionService.getSubscription(id);
        if (response && typeof response === 'object' && 'error' in response) {
            return ErrorMessage.errorMessageFromString(response.error);
        }
        return response;

    }

    async getSubscriptions(): Promise<SubscriptionDto[] | ErrorMessage> {
        const response = await SubscriptionService.getSubscriptions();
        if (response && typeof response === 'object' && 'error' in response) {
            return ErrorMessage.errorMessageFromString(response.error);
        }
        return response;
    }
}