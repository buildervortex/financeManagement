import express from "express"
import jwtAuth from "../middleware/jwtAuth";
import ExpenseRepository from "../repositories/expenseRepository";
import { isObjectIdValid } from "../util/validate";
import ErrorMessage from "../model/error";
import Expense from "../model/expense";
import ExpenseMapper from "../mappers/expenseMapper";
import AddExpenseDto, { validateAddExpenseDto } from "../dto/expense/addExpenseDto";
import UpdateExpenseDto, { validateUpdateExpenseDto } from "../dto/expense/updateExpenseDto";
import RangeExpenseDto, { validateDateRange } from "../dto/expense/expenseRangeDto";
import GetAllExpenseQueryParams, { validateGetAllExpenseQueryParams } from "../query/expenses/getAll";

const expenseRouter = express.Router();
const expenseRepository = new ExpenseRepository();


expenseRouter.get("/", jwtAuth, async (request: express.Request | any, response: express.Response) => {
    const getAllExpenseQueryParameter: GetAllExpenseQueryParams = Object.assign(new GetAllExpenseQueryParams(), request.query);
    const { error,value } = validateGetAllExpenseQueryParams(getAllExpenseQueryParameter);

    if (error) {
        return response.status(400).send(ErrorMessage.errorMessageFromJoiError(error));
    }

    let expenses: Expense[];

    try {
        expenses = await expenseRepository.getAllExpenses(request.account._id, value);
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


expenseRouter.get("/categories", jwtAuth, async (request: express.Request | any, response: express.Response) => {

    let categories: String[];
    try {
        categories = await expenseRepository.getAllCategories(request.account._id);
    }
    catch (error) {
        if (error instanceof Error) return response.status(400).send(ErrorMessage.errorMessageFromString(error.message));
        else return response.status(500).send(ErrorMessage.ServerError);
    }

    response.send(categories);
});

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



expenseRouter.post("/", jwtAuth, async (request: express.Request | any, response: express.Response) => {
    const addExpenseDtoObject: AddExpenseDto = Object.assign(new AddExpenseDto(), request.body);
    const { error } = validateAddExpenseDto(addExpenseDtoObject);

    if (error) {
        return response.status(400).send(ErrorMessage.errorMessageFromJoiError(error));
    }

    let expense: Expense = ExpenseMapper.ToExpenseFromAddExpenseDto(addExpenseDtoObject);

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

    const updateExpenseDtoObject: UpdateExpenseDto = Object.assign(new UpdateExpenseDto(), request.body);
    const { error } = validateUpdateExpenseDto(updateExpenseDtoObject);

    if (error) {
        return response.status(400).send(ErrorMessage.errorMessageFromJoiError(error));
    }

    let expense: Expense = ExpenseMapper.ToExpenseFromUpdateExpenseDto(updateExpenseDtoObject);

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

expenseRouter.post("/:id/pay", jwtAuth, async (request: express.Request | any, response: express.Response) => {
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
    if (expense.paid === true) {
        return response.status(400).send(ErrorMessage.errorMessageFromString("The expense is already paid"));
    }
    expense.paid = true;
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
})



export default expenseRouter