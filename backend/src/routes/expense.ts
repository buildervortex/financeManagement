import express from "express"
import jwtAuth from "../middleware/jwtAuth";
import ExpenseRepository from "../repositories/expenseRepository";
import { isObjectIdValid } from "../util/validate";
import ErrorMessage from "../model/error";
import Expense from "../model/expense";
import ExpenseMapper from "../mappers/expenseMapper";
import { validateAddExpenseDto } from "../dto/expense/addExpenseDto";
import { validateUpdateExpenseDto } from "../dto/expense/updateExpenseDto";

const expenseRouter = express.Router();
const expenseRepository = new ExpenseRepository();

expenseRouter.get("/:id", jwtAuth, async (request: express.Request | any, response: express.Response) => {
    const expenseId = request.params.id;
    if (!isObjectIdValid(expenseId)) {
        return response.status(400).send(ErrorMessage.ObjectIdError);
    }

    let expense: Expense;

    try {
        expense = await expenseRepository.getExpense(expenseId, request.account._id);
    }
    catch (error) {
        if (error instanceof Error) return response.status(400).send(ErrorMessage.errorMessageFromString(error.message));
        else return response.status(500).send(ErrorMessage.ServerError);
    }
    if (!expense) {
        return response.status(500).send(ErrorMessage.ServerError);
    }
    response.send(ExpenseMapper.ToExpenseDto(expense));
});

expenseRouter.get("/", jwtAuth, async (request: express.Request | any, response: express.Response) => {
    let expenses: Expense[];

    try {
        expenses = await expenseRepository.getAllExpenses(request.account._id);
    }
    catch (error) {
        if (error instanceof Error) return response.status(400).send(ErrorMessage.errorMessageFromString(error.message));
        else return response.status(500).send(ErrorMessage.ServerError);
    }

    if (!expenses) {
        return response.status(500).send(ErrorMessage.ServerError);
    }

    response.send(expenses.map(expense => ExpenseMapper.ToExpenseDto(expense)));
});

expenseRouter.post("/", jwtAuth, async (request: express.Request | any, response: express.Response) => {
    const { error } = validateAddExpenseDto(request.body);

    if (error) {
        return response.status(400).send(ErrorMessage.errorMessageFromJoiError(error));
    }

    let expense: Expense = ExpenseMapper.ToExpenseFromAddExpenseDto(request.body);

    try {
        expense = await expenseRepository.addExpense(expense, request.account._id);
    }
    catch (error) {
        if (error instanceof Error) return response.status(400).send(ErrorMessage.errorMessageFromString(error.message));
        else return response.status(500).send(ErrorMessage.ServerError);
    }

    if (!expense) {
        return response.status(500).send(ErrorMessage.ServerError);
    }

    response.send(ExpenseMapper.ToExpenseDto(expense));
});

expenseRouter.put("/:id", jwtAuth, async (request: express.Request | any, response: express.Response) => {
    const expenseId = request.params.id;
    if (!isObjectIdValid(expenseId)) {
        return response.status(400).send(ErrorMessage.ObjectIdError);
    }

    const { error } = validateUpdateExpenseDto(request.body);

    if (error) {
        return response.status(400).send(ErrorMessage.errorMessageFromJoiError(error));
    }

    let expense: Expense = ExpenseMapper.ToExpenseFromUpdateExpenseDto(request.body);

    try {
        expense = await expenseRepository.updateExpense(request.account._id, expenseId, expense);
    }
    catch (error) {
        if (error instanceof Error) return response.status(400).send(ErrorMessage.errorMessageFromString(error.message));
        else return response.status(500).send(ErrorMessage.ServerError);
    }

    if (!expense) {
        return response.status(500).send(ErrorMessage.ServerError);
    }

    response.send(ExpenseMapper.ToExpenseDto(expense));
});

expenseRouter.delete("/:id", jwtAuth, async (request: express.Request | any, response: express.Response) => {
    const expenseId = request.params.id;
    if (!isObjectIdValid(expenseId)) {
        return response.status(400).send(ErrorMessage.ObjectIdError);
    }
    let expense: Expense;

    try {
        expense = await expenseRepository.deleteExpense(request.account._id, expenseId);
    }
    catch (error) {
        if (error instanceof Error) return response.status(400).send(ErrorMessage.errorMessageFromString(error.message));
        else return response.status(500).send(ErrorMessage.ServerError);
    }

    if (!expense) {
        return response.status(500).send(ErrorMessage.ServerError);
    }

    response.send(ExpenseMapper.ToExpenseDto(expense));
});

export default expenseRouter