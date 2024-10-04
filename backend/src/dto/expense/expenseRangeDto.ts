import Joi from "joi";

class RangeExpenseDto {
    startDate?: string
    endDate?: string;
}


export function validateDateRange(rangeExpenseDto:RangeExpenseDto): Joi.ValidationResult {
    const schema = Joi.object({
        startDate: Joi.date().required().less("now").less(Joi.ref("endDate")),
        endDate: Joi.date().required().less("now")
    })

    return schema.validate(rangeExpenseDto);
}

export default RangeExpenseDto;