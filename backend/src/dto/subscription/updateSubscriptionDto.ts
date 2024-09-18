import Joi from "joi";

class UpdateSubscriptionDto {
    name?: string
    category?: string = "subscription";
    description?: string
    amount?: number
    currencyType?: string = "LKR";
    remindBeforeDays?: number = 1;
}


export function validateUpdateSubscriptionDto(updateSubscriptionDto: UpdateSubscriptionDto): Joi.ValidationResult {
    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        category: Joi.string().min(2).max(50),
        description: Joi.string().min(5).max(250),
        amount: Joi.number().min(1).required(),
        currencyType: Joi.string().min(2).max(10),
        remindBeforeDays: Joi.number().min(1)
    })
    return schema.validate(updateSubscriptionDto);
}

export default UpdateSubscriptionDto;