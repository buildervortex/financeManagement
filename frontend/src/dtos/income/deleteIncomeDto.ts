import Joi from "joi";

class deleteIncomeDto {
    id: string =""
}


export function validateDeleteIncomeDto(DeleteIncomeDto: deleteIncomeDto): Joi.ValidationResult {
    const schema = Joi.object({
        id: Joi.string().min(0).max(50).required(),
    })

    return schema.validate(deleteIncomeDto);
}

export default deleteIncomeDto;