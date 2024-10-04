import AddSubscriptionDto from "../dto/subscription/addSusbscriptionDto";
import SubscriptionDto from "../dto/subscription/subscriptionDto";
import UpdateSubscriptionDto from "../dto/subscription/updateSubscriptionDto";
import Subscription from "../model/subscriptions";

export default class SubscriptionMapper {
    static ToSubscriptionDto(subscription: Subscription): SubscriptionDto {
        const subscriptionDto = new SubscriptionDto();

        subscriptionDto.amount = subscription.amount;
        subscriptionDto.category = subscription.category;
        subscriptionDto.currencyType = subscription.currencyType;
        subscriptionDto.description = subscription.description;
        subscriptionDto.installmentIntervalDays = subscription.installmentIntervalDays;
        subscriptionDto.id = subscription.id;
        subscriptionDto.initialPaymentDate = subscription.initialPaymentDate;
        subscriptionDto.name = subscription?.name;
        subscriptionDto.nextInstallmentDate = subscription.nextInstallmentDate;
        subscriptionDto.lastPaymentDate = subscription.lastPaymentDate;
        subscriptionDto.completedInstallments = subscription.completedInstallments;
        subscriptionDto.remindBeforeDays = subscription.remindBeforeDays;
        subscriptionDto.totalInstallments = subscription.totalInstallments;
        subscriptionDto.isRecurringIndefinitely = subscription.isRecurringIndefinitely;

        return subscriptionDto;

    }

    static ToSubscriptionFromAddSubscriptionDto(addSubscriptionDto: AddSubscriptionDto): Subscription {
        const subscription = new Subscription();

        subscription.amount = addSubscriptionDto.amount!
        subscription.category = addSubscriptionDto.category?.toLowerCase()!
        subscription.currencyType = addSubscriptionDto.currencyType!
        subscription.description = addSubscriptionDto.description!
        subscription.installmentIntervalDays = addSubscriptionDto.installmentIntervalDays!
        subscription.initialPaymentDate = addSubscriptionDto.initialPaymentDate!
        subscription.name = addSubscriptionDto.name!
        subscription.remindBeforeDays = addSubscriptionDto.remindBeforeDays!
        subscription.isRecurringIndefinitely = addSubscriptionDto.isRecurringIndefinitely!
        subscription.totalInstallments = addSubscriptionDto.totalInstallments!
        subscription.completedInstallments = 0;

        return subscription;
    }

    static ToSubscriptionFromUpdateSubscriptionDto(updateSubscriptionDto: UpdateSubscriptionDto): Subscription {
        const subscription = new Subscription();

        subscription.amount = updateSubscriptionDto.amount!
        subscription.category = updateSubscriptionDto.category?.toLowerCase()!
        subscription.currencyType = updateSubscriptionDto.currencyType!
        subscription.description = updateSubscriptionDto.description!
        subscription.name = updateSubscriptionDto.name!
        subscription.remindBeforeDays = updateSubscriptionDto.remindBeforeDays!

        return subscription;
    }
}