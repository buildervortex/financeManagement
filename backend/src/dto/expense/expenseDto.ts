import Joi from "joi";

class ExpenseDto {
    id: string = ""
    name: string = ""
    category?: string = ""
    description?: string = ""
    amount: number = 0
    currencyType: string = ""
    paymentDate?: Date = new Date();
}

export default ExpenseDto;