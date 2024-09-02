import IIncomeRepository from "../interfaces/incomeRepository";
import Account from "../model/account";
import Income from "../model/income";

export default class IncomeRepository implements IIncomeRepository {
    async addIncome(income: Income, accountId: string): Promise<Income> {
        let existingAccount = await Account.findById(accountId);
        if (!existingAccount) {
            throw new Error("The account is not exist")
        }
        existingAccount.incomes.push(income);
        const updatedAccount = await existingAccount.save();
        if (!updatedAccount) {
            throw new Error("Server error");
        }

        const addedIncome = updatedAccount.incomes[updatedAccount.incomes.length - 1];
        return addedIncome;
    }

}