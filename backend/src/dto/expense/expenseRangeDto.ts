import Joi from "joi";

class RangeExpenseDto {
    startDate?: string
    endDate?: string;
}


export function validateDateRange(rangeExpenseDto:RangeExpenseDto): Joi.ValidationResult {
    const schema = Joi.object({
        startDate: Joi.date().required().less(Joi.ref("endDate")),
        endDate: Joi.date().required()
    })

    return schema.validate(rangeExpenseDto);
}

export default RangeExpenseDto;