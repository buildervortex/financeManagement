import Joi from "joi";

class ExpenseDto {
    id?: string
    name?: string
    category?: string
    description?: string
    amount?: number
    paymentDate?: Date
    type?: string;
    paid?: boolean
}


export default ExpenseDto;