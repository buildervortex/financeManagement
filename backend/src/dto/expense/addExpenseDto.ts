import Joi from "joi";

class AddExpenseDto {
    name: string = "";
    category?: string;
    description?: string = "";
    amount: number = 0;
    currencyType: string = "LKR";
}

export function validateAddExpenseDto(addExpenseDto: AddExpenseDto): Joi.ValidationResult {
    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        category: Joi.string().min(2).max(50),
        description: Joi.string().min(5).max(250),
        amount: Joi.number().min(1).required(),
        currencyType: Joi.string().min(2).max(10)
    })

    return schema.validate(addExpenseDto);
}

export default AddExpenseDto;