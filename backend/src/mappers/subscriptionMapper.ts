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
        subscriptionDto.description = subscription.currencyType;
        subscriptionDto.duration = subscription.duration;
        subscriptionDto.id = subscription.id;
        subscriptionDto.installmentStartingDate = subscription.installmentStartingDate;
        subscriptionDto.name = subscription?.name;
        subscriptionDto.nextInstallmentDate = subscription.nextInstallmentDate;
        subscriptionDto.previousInstalmentDate = subscription.previousInstalmentDate;
        subscriptionDto.paidInstallments = subscription.paidInstallments;
        subscriptionDto.remindBeforeDays = subscription.remindBeforeDays;
        subscriptionDto.repeatCount = subscription.repeatCount;
        subscriptionDto.repeatAlways = subscription.repeatAlways;

        return subscriptionDto;

    }

    static ToSubscriptionFromAddSubscriptionDto(addSubscriptionDto: AddSubscriptionDto): Subscription {
        const subscription = new Subscription();

        subscription.amount = addSubscriptionDto.amount!
        subscription.category = addSubscriptionDto.category!
        subscription.currencyType = addSubscriptionDto.currencyType!
        subscription.description = addSubscriptionDto.description!
        subscription.duration = addSubscriptionDto.duration!
        subscription.installmentStartingDate = addSubscriptionDto.installmentStartingDate!
        subscription.name = addSubscriptionDto.name!
        subscription.remindBeforeDays = addSubscriptionDto.remindBeforeDays!
        subscription.repeatAlways = addSubscriptionDto.repeatAlways!
        subscription.repeatCount = addSubscriptionDto.repeatCount!
        subscription.paidInstallments = 0;

        return subscription;
    }

    static ToSubscriptionFromUpdateSubscriptionDto(updateSubscriptionDto: UpdateSubscriptionDto): Subscription {
        const subscription = new Subscription();

        subscription.amount = updateSubscriptionDto.amount!
        subscription.category = updateSubscriptionDto.category!
        subscription.currencyType = updateSubscriptionDto.currencyType!
        subscription.description = updateSubscriptionDto.description!
        subscription.name = updateSubscriptionDto.name!
        subscription.remindBeforeDays = updateSubscriptionDto.remindBeforeDays!

        return subscription;
    }
}