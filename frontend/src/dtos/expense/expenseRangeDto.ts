import Joi from "joi";

class ExpenseRangeDto {
    startDate?: string
    endDate?: string;
}


export function validateDateRange(expenseRangeDto:ExpenseRangeDto): Joi.ValidationResult {
    const schema = Joi.object({
        startDate: Joi.date().required().less("now").less(Joi.ref("endDate")),
        endDate: Joi.date().required().less("now")
    })

    return schema.validate(expenseRangeDto);
}

export default ExpenseRangeDto;