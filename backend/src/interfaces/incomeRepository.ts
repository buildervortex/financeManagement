import Income from "../model/income";

export default interface IIncomeRepository {
    addIncome(income: Income, accountId: string): Promise<Income>;
}