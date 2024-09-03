import Joi from "joi";

class deleteIncomeDto {
    id: string =""
    name: any;
    description: any;
    amount: any;
    currencyType: any;
    monthly: any;
    monthlyDate: any;
}


export function validateDeleteIncomeDto(DeleteIncomeDto: deleteIncomeDto): Joi.ValidationResult {
    const schema = Joi.object({
        id: Joi.string().min(0).max(50).required(),
    })

    return schema.validate(deleteIncomeDto);
}

export default deleteIncomeDto;