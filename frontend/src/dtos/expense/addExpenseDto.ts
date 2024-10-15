import Joi from "joi";

class AddExpenseDto {
    name?: string
    category?: string = "simpleExpense";
    description?: string
    amount?: number
    paid?: boolean = true;
}


export function validateAddExpenseDto(addExpenseDto: AddExpenseDto): Joi.ValidationResult {
    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        category: Joi.string().min(2).max(50),
        description: Joi.string().min(5).max(250),
        amount: Joi.number().min(1).required(),
        paid: Joi.boolean().required()
    })

    return schema.validate(addExpenseDto);
}

export default AddExpenseDto;