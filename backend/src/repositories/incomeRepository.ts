import IIncomeRepository from "../interfaces/incomeRepository";
import Account from "../model/account";
import Income from "../model/income";

export default class IncomeRepository implements IIncomeRepository {
    async addIncome(income: Income, accountId: string): Promise<Income> {
        let existingAccount = await Account.findById(accountId);
        if (!existingAccount) {
            throw new Error("Account not found")
        }
        existingAccount.incomes.push(income);
        const updatedAccount = await existingAccount.save();
        if (!updatedAccount) {
            throw new Error("Server error");
        }

        const addedIncome = updatedAccount.incomes[updatedAccount.incomes.length - 1];
        return addedIncome;
    }

    async getAllIncomes(accountId: string): Promise<Income[]> {
        let existingAccount = await Account.findById(accountId);
        if (!existingAccount) {
            throw new Error("Account not found")
        }

        return existingAccount.incomes;
    }

    async getIncome(incomeId: string, accountId: string): Promise<Income> {
        let existingAccount = await Account.findById(accountId);
        if (!existingAccount) {
            throw new Error("Account not found")
        }
        const income = existingAccount.incomes.find(income => income.id === incomeId);

        if (!income) {
            throw new Error("Income not found");
        }

        return income;
    }

    async updateIncome(accountId: string, incomeId: string, newIncome: Income): Promise<Income> {
        let existingAccount = await Account.findById(accountId);
        if (!existingAccount) {
            throw new Error("Account not found")
        }

        const incomeIndex = existingAccount.incomes.findIndex(income => income.id === incomeId);
        if (incomeIndex === -1) {
            throw new Error("Income not found");
        }

        // existingAccount.incomes[incomeIndex] = newIncome;
        existingAccount.incomes[incomeIndex].set(newIncome);

        const updatedAccount = await existingAccount.save();

        const updatedIncome = updatedAccount.incomes[incomeIndex];
        return updatedIncome;
    }

    async deleteIncome(accountId: string, incomeId: string): Promise<Income> {
        let existingAccount = await Account.findById(accountId);
        if (!existingAccount) {
            throw new Error("Account not found")
        }

        const deleteIncome = existingAccount.incomes.find(income => income.id === incomeId);
        if (!deleteIncome) {
            throw new Error("Income not found");
        }

        const incomes = existingAccount.incomes.filter(income => income.id !== incomeId);

        existingAccount.incomes = incomes;
        await existingAccount.save();

        return deleteIncome;
    }

}