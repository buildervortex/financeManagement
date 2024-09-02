import express from "express"
import jwtAuth from "../middleware/jwtAuth";
import { isObjectIdValid } from "../util/validate";
import ErrorMessage from "../model/error";
import IncomeRepository from "../repositories/incomeRepository";
import Income from "../model/income";
import IncomeMapper from "../mappers/incomeMapper";
import { validateAddIncomeDto } from "../dto/income/addIncomeDto";
import { validateUpdateIncome } from "../dto/income/updateIncomeDto";

const incomeRouter = express.Router();
const incomeRepository = new IncomeRepository();

incomeRouter.get("/:id", jwtAuth, async (request: express.Request | any, response: express.Response) => {
    const incomeId = request.params.id;
    if (!isObjectIdValid(incomeId)) {
        return response.status(400).send(ErrorMessage.ObjectIdError);
    }

    let income: Income;

    try {
        income = await incomeRepository.getIncome(incomeId, request.account._id);
    }
    catch (error) {
        if (error instanceof Error) return response.status(400).send(ErrorMessage.errorMessageFromString(error.message));
        else return response.status(500).send(ErrorMessage.ServerError);
    }
    if (!income) {
        return response.status(500).send(ErrorMessage.ServerError);
    }

    response.send(IncomeMapper.ToIncomeDto(income));
});

incomeRouter.get("/", jwtAuth, async (request: express.Request | any, response: express.Response) => {
    let incomes: Income[];

    try {
        incomes = await incomeRepository.getAllIncomes(request.account._id);
    }
    catch (error) {
        if (error instanceof Error) return response.status(400).send(ErrorMessage.errorMessageFromString(error.message));
        else return response.status(500).send(ErrorMessage.ServerError);
    }

    if (!incomes) {
        return response.status(500).send(ErrorMessage.ServerError);
    }

    response.send(incomes.map(income => IncomeMapper.ToIncomeDto(income)));
});
incomeRouter.post("/", jwtAuth, async (request: express.Request | any, response: express.Response) => {
    const { error } = validateAddIncomeDto(request.body);

    if (error) {
        return response.status(400).send(ErrorMessage.errorMessageFromJoiError(error));
    }

    let income: Income = IncomeMapper.ToIncomeFromAddIncomeDto(request.body);

    try {
        income = await incomeRepository.addIncome(income, request.account._id);
    }
    catch (error) {
        if (error instanceof Error) return response.status(400).send(ErrorMessage.errorMessageFromString(error.message));
        else return response.status(500).send(ErrorMessage.ServerError);
    }

    if (!income) {
        return response.status(500).send(ErrorMessage.ServerError);
    }

    response.send(IncomeMapper.ToIncomeDto(income));
});

incomeRouter.put("/:id", jwtAuth, async (request: express.Request | any, response: express.Response) => {
    const incomeId = request.params.id;
    if (!isObjectIdValid(incomeId)) {
        return response.status(400).send(ErrorMessage.ObjectIdError);
    }

    const { error } = validateUpdateIncome(request.body);

    if (error) {
        return response.status(400).send(ErrorMessage.errorMessageFromJoiError(error));
    }

    let income: Income = IncomeMapper.ToIncomeFromUpdateIncomeDto(request.body);

    try {
        income = await incomeRepository.updateIncome(request.account._id, incomeId, income);
    }
    catch (error) {
        if (error instanceof Error) return response.status(400).send(ErrorMessage.errorMessageFromString(error.message));
        else return response.status(500).send(ErrorMessage.ServerError);
    }

    if (!income) {
        return response.status(500).send(ErrorMessage.ServerError);
    }

    response.send(IncomeMapper.ToIncomeDto(income));
});

incomeRouter.delete("/:id", jwtAuth, async (request: express.Request | any, response: express.Response) => {
    const incomeId = request.params.id;
    if (!isObjectIdValid(incomeId)) {
        return response.status(400).send(ErrorMessage.ObjectIdError);
    }
    let income: Income;

    try {
        income = await incomeRepository.deleteIncome(request.account._id, incomeId);
    }
    catch (error) {
        if (error instanceof Error) return response.status(400).send(ErrorMessage.errorMessageFromString(error.message));
        else return response.status(500).send(ErrorMessage.ServerError);
    }

    if (!income) {
        return response.status(500).send(ErrorMessage.ServerError);
    }

    response.send(IncomeMapper.ToIncomeDto(income));
});



export default incomeRouter;