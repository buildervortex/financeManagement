import IExpenseRepository from "../interfaces/expenseRepository";
import Account from "../model/account";
import Expense from "../model/expense";

export default class ExpenseRepository implements IExpenseRepository {
    async addExpense(expense: Expense, accountId: string): Promise<Expense> {
        let existingAccount = await Account.findById(accountId);
        if (!existingAccount) {
            throw new Error("Account not found")
        }
        existingAccount.expenses.push(expense);
        const updatedAccount = await existingAccount.save();
        if (!updatedAccount) {
            throw new Error("Server error");
        }

        const addedExpense = updatedAccount.expenses[updatedAccount.expenses.length - 1];
        return addedExpense;
    }

    async getAllExpenses(accountId: string): Promise<Expense[]> {
        let existingAccount = await Account.findById(accountId);
        if (!existingAccount) {
            throw new Error("Account not found")
        }

        return existingAccount.expenses;
    }

    async getExpense(expenseId: string, accountId: string): Promise<Expense> {
        let existingAccount = await Account.findById(accountId);
        if (!existingAccount) {
            throw new Error("Account not found")
        }
        const expense = existingAccount.expenses.find(expense => expense.id === expenseId);

        if (!expense) {
            throw new Error("Expense not found");
        }

        return expense;
    }

    async updateExpense(accountId: string, expenseId: string, newExpense: Expense): Promise<Expense> {
        let existingAccount = await Account.findById(accountId);
        if (!existingAccount) {
            throw new Error("Account not found")
        }

        const expenseIndex = existingAccount.expenses.findIndex(expense => expense.id === expenseId);
        if (expenseIndex === -1) {
            throw new Error("Expense not found");
        }

        existingAccount.expenses[expenseIndex] = newExpense;

        const updatedAccount = await existingAccount.save();

        const updatedExpense = updatedAccount.expenses[expenseIndex];
        return updatedExpense;
    }

    async deleteExpense(accountId: string, expenseId: string): Promise<Expense> {
        let existingAccount = await Account.findById(accountId);
        if (!existingAccount) {
            throw new Error("Account not found")
        }

        const deleteExpense = existingAccount.expenses.find(expense => expense.id === expenseId);
        if (!deleteExpense) {
            throw new Error("Expense not found");
        }

        const expenses = existingAccount.expenses.filter(expense => expense.id !== expenseId);

        existingAccount.expenses = expenses;
        await existingAccount.save();

        return deleteExpense;
    }

}