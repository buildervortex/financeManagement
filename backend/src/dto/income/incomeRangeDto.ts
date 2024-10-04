import Joi from "joi";

class IncomeRangeDto {
    startDate?: string
    endDate?: string;
}


export function validateIncomeRangeDto(incomeRangeDto: IncomeRangeDto): Joi.ValidationResult {
    const schema = Joi.object({
        startDate: Joi.date().required().less("now").less(Joi.ref("endDate")),
        endDate: Joi.date().required().less("now")
    })

    return schema.validate(incomeRangeDto);
}

export default IncomeRangeDto; 