import mongoose from "mongoose";
import IExpenseRepository from "../interfaces/expenseRepository";
import Account from "../model/account";
import Expense from "../model/expense";
import GetAllExpenseQueryParams from "../query/expenses/getAll";

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

    async getAllExpenses(accountId: string, getAllExpenseQuery: GetAllExpenseQueryParams): Promise<Expense[]> {
        let existingAccount = await Account.findById(accountId);
        if (!existingAccount) {
            throw new Error("Account not found")
        }

        const filteredExpenses = await Account.aggregate(createGetAllExpenseAggregationPipeline(accountId, getAllExpenseQuery));

        return filteredExpenses;
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

        const existingExpense = existingAccount.expenses[expenseIndex];
        newExpense._id = existingExpense._id;
        const updatedExpense = existingExpense.set(newExpense.toObject());

        await existingAccount.save();

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

    async getAllCategories(accountId: string): Promise<String[]> {
        let existingAccount = await Account.findById(accountId);
        if (!existingAccount) {
            throw new Error("Account not found")
        }

        const categories = await Account.aggregate(createGetAllCategoriesAggregationPipeline(accountId));
        return categories[0]["categories"];
    }

}


function createGetAllExpenseAggregationPipeline(accountId: string, getAllExpenseQueryParams: GetAllExpenseQueryParams): any {
    // db.Account.aggregate([{ $match: { _id: ObjectId('66ffa69f753420e6ffe9711a') } }, { $unwind: "$expenses" }, { $match: { $and: [{ "expenses.paymentDate": { $gte: ISODate('2024-10-04T08:35:12.196Z') } }, { "expenses.paymentDate": { $lte: ISODate('2024-10-04T08:39:12.196Z') } }] } }, { $project: { "expenses": 1, "_id": 0 } },{$sort:{"expenses.amount":1}},{$skip:0},{$limit:1}])
    const pipeline: any[] = [];

    // select the account
    pipeline.push({
        $match: {
            _id: new mongoose.Types.ObjectId(accountId),
        },
    });

    // unwind expenses
    pipeline.push({
        $unwind: "$expenses",
    });

    // filter the expenses by startDate and endDate
    if (getAllExpenseQueryParams.startDate || getAllExpenseQueryParams.endDate) {
        const dateFilters: any[] = [];

        if (getAllExpenseQueryParams.startDate) {
            dateFilters.push(
                { "expenses.paymentDate": { $gte: getAllExpenseQueryParams.startDate } }
            )
        }
        if (getAllExpenseQueryParams.endDate) {
            dateFilters.push(
                { "expenses.paymentDate": { $lte: getAllExpenseQueryParams.endDate } }
            )
        }
        pipeline.push({
            $match: {
                $and: dateFilters
            },
        });
    }

    // project only the expenses
    pipeline.push({
        $project: {
            "expenses": 1,
            "_id": 0
        }
    })

    // replace the root
    pipeline.push({
        $replaceRoot: { newRoot: "$expenses" }
    })

    // add sorting
    let sorting: any = {}
    sorting[getAllExpenseQueryParams.sortBy] = getAllExpenseQueryParams.order;
    pipeline.push({
        $sort: sorting
    })

    // add skips
    if (getAllExpenseQueryParams.skip) {
        pipeline.push({
            $skip: getAllExpenseQueryParams.skip
        })
    }

    // add limit
    if (getAllExpenseQueryParams.limit) {
        pipeline.push({
            $limit: getAllExpenseQueryParams.limit
        })
    }
    return pipeline;
}

function createGetAllCategoriesAggregationPipeline(accountId: string): any {
    const pipeline: any[] = [];

    // select the account
    pipeline.push({
        $match: {
            _id: new mongoose.Types.ObjectId(accountId),
        },
    });

    // unwind expenses
    pipeline.push({
        $unwind: "$expenses",
    });

    // group the expenses
    pipeline.push({
        $group: { _id: "$expenses.category" }
    })

    // project the categories
    pipeline.push({
        $project: { _id: 0, category: "$_id" }
    })

    // group the categories
    pipeline.push({
        $group: { _id: null, categories: { $addToSet: "$category" } }
    })

    // project the cateogies
    pipeline.push({
        $project: { _id: 0, categories: 1 }
    })

    return pipeline;
}