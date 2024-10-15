import Joi from "joi";

class UpdateExpenseDto {
    name?: string
    category?: string;
    description?: string
    amount?: number
    paid?: boolean
}

export function validateUpdateExpenseDto(updateExpenseDto: UpdateExpenseDto): Joi.ValidationResult {
    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        category: Joi.string().min(2).max(50),
        description: Joi.string().min(5).max(250),
        amount: Joi.number().min(1).required(),
        paid: Joi.boolean().required()
    })

    return schema.validate(updateExpenseDto);
}

export default UpdateExpenseDto;