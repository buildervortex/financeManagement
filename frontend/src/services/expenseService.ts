import AddExpenseDto from "../dtos/expense/addExpenseDto";
import ExpenseDto from "../dtos/expense/expenseDto";
import UpdateExpenseDto from "../dtos/expense/updateExpenseDto";
import Cast from "../utils/cast";
import ErrorMessage from "../viewModels/error";
import Api from "./api";

export default class ExpenseService{
    static async addExpense (addExpenseDto: AddExpenseDto,): Promise<ExpenseDto | ErrorMessage> {
        const response = await Api.post<ExpenseDto | ErrorMessage>("/expenses", addExpenseDto);
        return Cast.errorMessageCast(response);
    }

    static async updateExpense (updateExpenseDto: UpdateExpenseDto, id: string): Promise<ExpenseDto | ErrorMessage> {
        const response = await Api.put<ExpenseDto | ErrorMessage>(`/expenses/${id}`, updateExpenseDto);
        return Cast.errorMessageCast(response);
    }

    static async deleteExpense( id:string) :Promise<ExpenseDto | ErrorMessage> {
        const response = await Api.delete<ExpenseDto |  ErrorMessage>(`/expenses/${id}`);
        return Cast.errorMessageCast(response);
    }

    static async getExpenses(): Promise<ExpenseDto[] | ErrorMessage>{
        const response = await Api.get<ExpenseDto[] | ErrorMessage>(`/expenses/`);
        return Cast.errorMessageCast(response);
    }

    static async getExpense(id : string): Promise<ExpenseDto | ErrorMessage>{
        const response = await Api.get<ExpenseDto | ErrorMessage>(`/expenses/${id}`);
        return Cast.errorMessageCast(response);
    }

}