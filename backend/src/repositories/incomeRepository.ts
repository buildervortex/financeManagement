import mongoose from "mongoose";
import IIncomeRepository from "../interfaces/incomeRepository";
import Account from "../model/account";
import Income from "../model/income";
import GetAllIncomeQueryParams from "../query/incomes/getAllIncomes";

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

    async getAllIncomes(accountId: string, getAllIncomeQuery: GetAllIncomeQueryParams): Promise<Income[]> {
        let existingAccount = await Account.findById(accountId);
        if (!existingAccount) {
            throw new Error("Account not found")
        }

        const filteredIncomes = await Account.aggregate(createGetAllIncomeAggregationPipeline(accountId, getAllIncomeQuery));

        return filteredIncomes;
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

        const existingIncome = existingAccount.incomes[incomeIndex];
        newIncome._id = existingIncome._id;
        const updatedIncome = existingIncome.set(newIncome.toObject());

        await existingAccount.save();
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


    async getIncomeInRange(accountId: string, startDate: Date, endDate: Date): Promise<Income[]> {
        let existingAccount = await Account.findById(accountId);
        if (!existingAccount) {
            throw new Error("Account not found")
        }

        const incomes = existingAccount.incomes.filter(income => (income.incomeDate.getTime() >= startDate.getTime() && income.incomeDate.getTime() <= endDate.getTime()));
        return incomes.sort((a, b) => a.incomeDate.getTime() - b.incomeDate.getTime());
    }
}

/* db.Account.aggregate([{ $match: { _id: ObjectId('66d42d227ca71966868a43d0') } }, { $unwind: "$incomes" }, { $match: { $and: [{ "incomes.incomeDate": { $gte: ISODate('2024-09-01T08:35:12.196Z') } }, { "incomes.incomeDate": { $lte: ISODate('2024-10-10T08:39:12.196Z') } }] } }, { $project: { "incomes": 1, "_id": 0 } },{$replaceRoot:{newRoot: "$incomes"}},{$sort:{"incomes.amount":-1}},{$skip:0},{$limit:100}])
*/

function createGetAllIncomeAggregationPipeline(accountId: string, getAllIncomeQueryParams: GetAllIncomeQueryParams): any {
    const pipeline: any[] = [];

    // select the account
    pipeline.push({
        $match: {
            _id: new mongoose.Types.ObjectId(accountId),
        }
    })

    // unwind incomes
    pipeline.push({
        $unwind: "$incomes"
    })

    // filter the incomes by startDate and endDate
    if (getAllIncomeQueryParams.startDate || getAllIncomeQueryParams.endDate) {
        const dateFilters: any[] = [];

        if (getAllIncomeQueryParams.startDate) {
            dateFilters.push({
                "incomes.incomeDate": { $gte: getAllIncomeQueryParams.startDate }
            });
        }

        if (getAllIncomeQueryParams.endDate) {
            dateFilters.push({
                "incomes.incomeDate": { $lte: getAllIncomeQueryParams.endDate }
            })
        }
        pipeline.push({
            $match: {
                $and: dateFilters
            }
        });
    }

    // project only the incomes
    pipeline.push({
        $project: { "incomes": 1, "_id": 0 }
    })

    // replace the root
    pipeline.push(
        { $replaceRoot: { newRoot: "$incomes" } }
    )

    // add sorting
    let sorting: any = {}
    sorting[getAllIncomeQueryParams.sortBy] = getAllIncomeQueryParams.order;
    pipeline.push({
        $sort: sorting
    })

    // add skip
    if (getAllIncomeQueryParams.skip) {
        pipeline.push({
            $skip: getAllIncomeQueryParams.skip
        })
    }

    // add limit
    if (getAllIncomeQueryParams.limit) {
        pipeline.push({
            $limit: getAllIncomeQueryParams.limit
        })
    }

    return pipeline;
}