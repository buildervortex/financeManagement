import Joi from "joi";

class AddSubscriptionDto {
    name?: string
    category?: string = "subscription";
    description?: string
    amount?: number
    currencyType?: string = "LKR";
    installmentStartingDate?: Date = new Date();
    duration?: number = 1
    repeatCount?: number
    repeatAlways?: boolean = false
    remindBeforeDays?: number = 1
}

export function validateAddSubscriptionDto(addSubscriptionDto: AddSubscriptionDto): Joi.ValidationResult {
    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        category: Joi.string().min(2).max(50),
        description: Joi.string().min(5).max(250),
        amount: Joi.number().min(1).required(),
        currencyType: Joi.string().min(2).max(10),
        installmentStartingDate: Joi.date().required(),
        duration: Joi.number().min(1),
        repeatAlways: Joi.boolean(),
        repeatCount: Joi.number().min(1).when("repeatAlways", {
            is: true,
            then: Joi.forbidden(),
            otherwise: Joi.required()
        }),
        remindBeforeDays: Joi.number().min(1)
    })
    return schema.validate(addSubscriptionDto);
}

export default AddSubscriptionDto;