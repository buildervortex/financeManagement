import Joi from "joi";

class AddSubscriptionDto {
    name?: string
    category?: string = "subscription";
    description?: string
    amount?: number
    currencyType?: string = "LKR";
    initialPaymentDate?: Date = new Date();
    installmentIntervalDays?: number = 1
    totalInstallments?: number
    isRecurringIndefinitely?: boolean = false
    remindBeforeDays?: number = 1
}

export function validateAddSubscriptionDto(addSubscriptionDto: AddSubscriptionDto): Joi.ValidationResult {
    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        category: Joi.string().min(2).max(50),
        description: Joi.string().min(5).max(250),
        amount: Joi.number().min(1).required(),
        currencyType: Joi.string().min(2).max(10),
        initialPaymentDate: Joi.date().required(),
        installmentIntervalDays: Joi.number().integer().min(1),
        isRecurringIndefinitely: Joi.boolean(),
        totalInstallments: Joi.number().min(1).when("isRecurringIndefinitely", {
            is: true,
            then: Joi.forbidden(),
            otherwise: Joi.required()
        }),
        remindBeforeDays: Joi.number().integer().min(1)
    }).custom((value, helpers) => {
        if(value.remindBeforeDays >= value.installmentIntervalDays){
            return helpers.error("\"remindBeforeDays\" should be less than \"installmentIntervalDays\"");
        }
        return value;
    },"Custom validation for remindBeforeDays")
    return schema.validate(addSubscriptionDto);
}

export default AddSubscriptionDto;