import Income from "../model/income";

export default interface IIncomeRepository {
    addIncome(income: Income, accountId: string): Promise<Income>;
    getAllIncomes(accountId: string): Promise<Income[]>;
    getIncome(incomeId: string, accountId: string): Promise<Income>;
    updateIncome(accountId: string, incomeId: string, newIncome: Income): Promise<Income>;
    deleteIncome(accountId: string, incomeId: string): Promise<Income>;
}