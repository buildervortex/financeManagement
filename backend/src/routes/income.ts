import express from "express"
import jwtAuth from "../middleware/jwtAuth";
import { isObjectIdValid } from "../util/validate";
import ErrorMessage from "../model/error";
import IncomeRepository from "../repositories/incomeRepository";
import Income from "../model/income";
import IncomeMapper from "../mappers/incomeMapper";

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

    response.send(incomes.map(income => IncomeMapper.ToIncomeDto(income)));
});
incomeRouter.post("/", jwtAuth, async (request: express.Request, response: express.Response) => {
    // retriev the accountId from the request object which added by the jwtAuth.js
    // const accountId = request.account._id;
});

incomeRouter.put("/:id", jwtAuth, async (request: express.Request, response: express.Response) => {

});

incomeRouter.delete("/:id", jwtAuth, async (request: express.Request, response: express.Response) => {

});



export default incomeRouter;