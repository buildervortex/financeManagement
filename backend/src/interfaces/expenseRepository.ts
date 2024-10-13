import Expense from "../model/expense";
import GetAllExpenseQuery from "../query/expenses/getAll";

export default interface IExpenseRepository {
    addExpense(expense: Expense, accountId: string): Promise<Expense>;
    getAllExpenses(accountId: string, getAllExpenseQuery?: GetAllExpenseQuery): Promise<Expense[]>;
    getExpense(expenseId: string, accountId: string): Promise<Expense>;
    updateExpense(accountId: string, expenseId: string, newExpense: Expense): Promise<Expense>;
    deleteExpense(accountId: string, expenseId: string): Promise<Expense>;
}