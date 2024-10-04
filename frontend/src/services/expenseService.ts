import AddExpenseDto from "../dtos/expense/addExpenseDto";
import ExpenseDto from "../dtos/expense/expenseDto";
import ExpenseRangeDto from "../dtos/expense/expenseRangeDto";
import UpdateExpenseDto from "../dtos/expense/updateExpenseDto";
import Cast from "../utils/cast";
import ErrorMessage from "../viewModels/error";
import Api from "./api";

export default class ExpenseService {
    static async addExpense(addExpenseDto: AddExpenseDto): Promise<ExpenseDto | ErrorMessage> {
        const response = await Api.post<ExpenseDto | ErrorMessage>("/expenses", addExpenseDto);
        return Cast.errorMessageCast(response);
    }

    static async updateExpense(updateExpenseDto: UpdateExpenseDto, id: string): Promise<ExpenseDto | ErrorMessage> {
        const response = await Api.put<ExpenseDto | ErrorMessage>(`/expenses/${id}`, updateExpenseDto);
        return Cast.errorMessageCast(response);
    }

    static async deleteExpense(id: string): Promise<ExpenseDto | ErrorMessage> {
        const response = await Api.delete<ExpenseDto | ErrorMessage>(`/expenses/${id}`);
        return Cast.errorMessageCast(response);
    }

    static async getExpenses(): Promise<ExpenseDto[] | ErrorMessage> {
        const response = await Api.get<ExpenseDto[] | ErrorMessage>(`/expenses/`);
        return Cast.errorMessageCast(response);
    }

    static async getExpense(id: string): Promise<ExpenseDto | ErrorMessage> {
        const response = await Api.get<ExpenseDto | ErrorMessage>(`/expenses/${id}`);
        return Cast.errorMessageCast(response);
    }

    static async getCategories(): Promise<ExpenseCategoriesDto | ErrorMessage> {
        const response = await Api.get<ExpenseCategoriesDto | ErrorMessage>(`/expenses/categories`);
        return Cast.errorMessageCast(response);
    }

    static async getExpensesInRange(expenseRangeDto: ExpenseRangeDto): Promise<ExpenseDto[] | ErrorMessage> {
        const response = await Api.post<ExpenseDto[] | ErrorMessage>(`/expenses/range`, expenseRangeDto);
        return Cast.errorMessageCast(response);

    }

}