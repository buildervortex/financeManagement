import Joi from "joi";

class addIncomeDto {
    name?: string
    description?: string
    amount?: number
    currencyType?: string
    monthly?: boolean
    monthlyDate?: number;
}


export function validateAddIncomeDto(IncomeDto: addIncomeDto): Joi.ValidationResult {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        description: Joi.string().min(5).max(250).optional(),
        amount: Joi.number().min(0).required(),
        currencyType: Joi.string().min(2).max(10).required(),
        monthly: Joi.boolean().required(),
        monthlyDate: Joi.number().optional().when("monthly", {
            is: true,
            then: Joi.required(),
            otherwise: Joi.forbidden()
        })
    })

    return schema.validate(IncomeDto);
}

export default addIncomeDto;