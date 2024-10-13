import Joi from "joi";

class GetAllExpenseQueryParams {
    sortBy?: string
    order?: number
    limit?: number
    skip?: number
    startDate?: Date
    endDate?: Date
}


export function validateGetAllExpenseQueryParams(getAllExpenseQueryParams: GetAllExpenseQueryParams): Joi.ValidationResult {
    let expenseKeys: string[] = ["name", "category", "description", "amount", "paymentDate", "type", "paid"]
    const schema = Joi.object({
        sortBy: Joi.string().optional().valid(...expenseKeys),
        order: Joi.number().valid(1, -1).optional(),
        limit: Joi.number().integer().min(0).optional(),
        skip: Joi.number().integer().min(0).optional(),
        startDate: Joi.date().optional(),
        endDate: Joi.date().optional(),
    })

    return schema.validate(getAllExpenseQueryParams);
}


export default GetAllExpenseQueryParams;