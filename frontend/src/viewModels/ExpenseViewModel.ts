import addExpenseDto, { validateAddExpenseDto } from "../dtos/expense/addExpenseDto";
import updateExpenseDto, { validateUpdateExpenseDto } from "../dtos/expense/updateExpenseDto";
import ExpenseDto from "../dtos/expense/expenseDto";
import ErrorMessage from "./error";
import ExpenseService from "../services/expenseService";


export default class ExpenseViewModel{
    async addExpense(addExpense: addExpenseDto): Promise<ExpenseDto | ErrorMessage> {
        const { error } = validateAddExpenseDto(addExpense);
        if (error)
            return ErrorMessage.errorMessageFromJoiError(error);
        const response = await ExpenseService.addExpense(addExpense);
        if (response && typeof response === 'object' && 'error' in response) {
            return ErrorMessage.errorMessageFromString(response.error);
        }
        return response;
    }
    async updateExpense(updateExpenseDto: updateExpenseDto, id: string): Promise<ExpenseDto | ErrorMessage> {
        const { error } = validateUpdateExpenseDto(updateExpenseDto);
        if (error)
            return ErrorMessage.errorMessageFromJoiError(error);
        const response = await ExpenseService.updateExpense(updateExpenseDto, id);
        if (response && typeof response === 'object' && 'error' in response) {
            return ErrorMessage.errorMessageFromString(response.error);
        }
        return response;
    }
    async DeleteExpense(id: string): Promise<ExpenseDto | ErrorMessage> {
        const response = await ExpenseService.deleteExpense(id);
        if (response && typeof response === 'object' && 'error' in response) {
            return ErrorMessage.errorMessageFromString(response.error);
        }
        return response;
    }

    async getExpense(id : string): Promise<ExpenseDto | ErrorMessage> {
        const response = await ExpenseService.getExpense(id);
        if (response && typeof response === 'object' && 'error' in response) {
            return ErrorMessage.errorMessageFromString(response.error);
        }
        return response;

    }

    async getExpenses(): Promise<ExpenseDto[] | ErrorMessage> {
        const response = await ExpenseService.getExpenses();
        if (response && typeof response === 'object' && 'error' in response) {
            return ErrorMessage.errorMessageFromString(response.error);
        }
        return response;
    }
}
