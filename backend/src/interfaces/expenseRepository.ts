import Expense from "../model/expense";

export default interface IExpenseRepository {
    addExpense(expense: Expense, accountId: string): Promise<Expense>;
    getAllExpenses(accountId: string): Promise<Expense[]>;
    getExpense(expenseId: string, accountId: string): Promise<Expense>;
    updateExpense(accountId: string, expenseId: string, newExpense: Expense): Promise<Expense>;
    deleteExpense(accountId: string, expenseId: string): Promise<Expense>;
}