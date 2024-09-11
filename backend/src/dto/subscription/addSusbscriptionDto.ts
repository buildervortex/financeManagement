import Joi from "joi";

class AddSubscriptionDto {
    name?: string
    category?: string
    description?: string
    amount?: number
    currencyType?: string
    installmentStartingDate?: Date
    duration?: number
    repeatCount?: number
    repeatAlways?: boolean
    remindBeforeDays?: number
}

export function validateAddSubscriptionDto(addSubscriptionDto: AddSubscriptionDto): Joi.ValidationResult {
    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        category: Joi.string().min(2).max(50),
        description: Joi.string().min(5).max(250),
        amount: Joi.number().min(1).required(),
        currencyType: Joi.string().min(2).max(10).default("LKR"),
        installmentStartingDate: Joi.date().required().default(new Date()),
        duration: Joi.number().min(1).default(1),
        repeatAlways: Joi.boolean().default(false),
        repeatCount: Joi.number().min(1).when("repeatAlways", {
            is: true,
            then: Joi.forbidden(),
            otherwise: Joi.required()
        }),
        remindBeforeDays: Joi.number().min(1).default(1)
    })
    return schema.validate(addSubscriptionDto);
}

export default AddSubscriptionDto;