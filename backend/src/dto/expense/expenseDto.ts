import Joi from "joi";

class ExpenseDto {
    id: string = ""
    name: string = ""
    category?: string = ""
    description?: string = ""
    amount: number = 0
    currencyType: string = ""
    paymentDate?: Date = new Date();
    type: string = ""
    paid: boolean = true
}


export default ExpenseDto;