import Joi from "joi";
import ExpenseDto from "../../dto/expense/expenseDto";

class GetAllExpenseQueryParams {
    sortBy: string = "amount"
    order: number = 1
    limit: number = 0
    skip: number = 0
    startDate?: Date
    endDate?: Date
}


export function validateGetAllExpenseQueryParams(getAllExpenseQueryParams: GetAllExpenseQueryParams): Joi.ValidationResult {
    let expenseKeys: string[] = ["name", "category", "description", "amount", "paymentDate", "type", "paid"]
    const schema = Joi.object({
        sortBy: Joi.string().optional().default("amount").valid(...expenseKeys),
        order: Joi.number().valid(1, -1).optional().default(1),
        limit: Joi.number().integer().min(0).optional().default(0),
        skip: Joi.number().integer().min(0).optional().default(0),
        startDate: Joi.date().optional(),
        endDate: Joi.date().optional(),
    })

    return schema.validate(getAllExpenseQueryParams);
}


export default GetAllExpenseQueryParams;