import Joi from "joi";

class GetAllIncomeQueryParams {
    sortBy: string = "amount"
    order: number = 1
    limit: number = 0
    skip: number = 0
    startDate?: Date
    endDate?: Date
}


export function validateGetAllIncomeQueryParams(getAllIncomeQueryParams: GetAllIncomeQueryParams): Joi.ValidationResult {
    let expenseKeys: string[] = ["name", "description", "amount", "incomeDate"]
    const schema = Joi.object({
        sortBy: Joi.string().optional().default("amount").valid(...expenseKeys),
        order: Joi.number().valid(1, -1).optional().default(1),
        limit: Joi.number().integer().min(0).optional().default(0),
        skip: Joi.number().integer().min(0).optional().default(0),
        startDate: Joi.date().optional(),
        endDate: Joi.date().optional(),
    })

    return schema.validate(getAllIncomeQueryParams);
}


export default GetAllIncomeQueryParams;