import Joi from "joi";

class UpdateSubscriptionDto {
    name?: string
    category?: string;
    description?: string
    amount?: number
    remindBeforeDays?: number;
}


export function validateUpdateSubscriptionDto(updateSubscriptionDto: UpdateSubscriptionDto): Joi.ValidationResult {
    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        category: Joi.string().min(2).max(50),
        description: Joi.string().min(5).max(250),
        amount: Joi.number().min(1).required(),
        remindBeforeDays: Joi.number().min(1)
    })
    return schema.validate(updateSubscriptionDto);
}

export default UpdateSubscriptionDto;