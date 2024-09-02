import Joi from "joi";

class addIncomeDto {
    name: string = ""
    description: string= ""
    amount: number = 0
    currencyType: string = ""
    monthly: boolean = false
    monthlyDate?: number;
}


export function validateIncomeDto(IncomeDto: addIncomeDto): Joi.ValidationResult {
    const schema = Joi.object({
        name: Joi.string().min(2).max(20).required(),
        description: Joi.string().min(2).max(200).required(),
        amount:Joi.number().min(0).required(),
        currencyType: Joi.string().min(0).max(3).required(),
        monthly: Joi.boolean().required(),
        monthlyDate:Joi.number()
    })

    return schema.validate(IncomeDto);
}

export default addIncomeDto;