import express from "express"
import jwtAuth from "../middleware/jwtAuth";
import GoalRepository from "../repositories/goalRepository";
import { isObjectIdValid } from "../util/validate";
import ErrorMessage from "../model/error";
import Goal from "../model/goal";
import GoalMapper from "../mappers/goalMapper";
import AddGoalDto, { validateAddGoalDto } from "../dto/goal/addGoalDto";
import UpdateGoalDto, { validateUpdateGoalDto } from "../dto/goal/updateGoalDto";
import GoalService from "../services/goalService";
import AddGoalPaymentDto, { validateAddGoalPaymentDto } from "../dto/goal/addGoalPaymentDto";

const goalRouter = express.Router();
const goalRepository = new GoalRepository();
const goalService = new GoalService();

goalRouter.get("/:id", jwtAuth, async (request: express.Request | any, response: express.Response) => {
    const goalId = request.params.id;
    if (!isObjectIdValid(goalId)) {
        return response.status(400).send(ErrorMessage.ObjectIdError);
    }

    let goal: Goal;

    try {
        goal = await goalRepository.getGoal(goalId, request.account._id);
    }
    catch (error) {
        if (error instanceof Error) return response.status(400).send(ErrorMessage.errorMessageFromString(error.message));
        else return response.status(500).send(ErrorMessage.ServerError);
    }
    if (!goal) {
        return response.status(500).send(ErrorMessage.ServerError);
    }
    response.send(GoalMapper.ToGoalDto(goal));
})

goalRouter.get("/", jwtAuth, async (request: express.Request | any, response: express.Response) => {
    let goals: Goal[];

    try {
        goals = await goalRepository.getGoals(request.account._id);
    }
    catch (error) {
        if (error instanceof Error) return response.status(400).send(ErrorMessage.errorMessageFromString(error.message));
        else return response.status(500).send(ErrorMessage.ServerError);
    }

    if (!goals) {
        return response.status(500).send(ErrorMessage.ServerError);
    }

    response.send(goals.map(goal => GoalMapper.ToGoalDto(goal)));
})


goalRouter.post("/", jwtAuth, async (request: express.Request | any, response: express.Response) => {
    const addGoalDtoObject: AddGoalDto = Object.assign(new AddGoalDto(), request.body);
    console.log(addGoalDtoObject);
    const { error } = validateAddGoalDto(addGoalDtoObject);

    if (error) {
        return response.status(400).send(ErrorMessage.errorMessageFromJoiError(error));
    }

    let goal: Goal = GoalMapper.ToGoalFromAddGoalDto(addGoalDtoObject);

    try {
        goal = await goalRepository.addGoal(goal, request.account._id);
    }
    catch (error) {
        if (error instanceof Error) return response.status(400).send(ErrorMessage.errorMessageFromString(error.message));
        else return response.status(500).send(ErrorMessage.ServerError);
    }

    if (!goal) {
        return response.status(500).send(ErrorMessage.ServerError);
    }

    response.send(GoalMapper.ToGoalDto(goal));
});

goalRouter.put("/:id", jwtAuth, async (request: express.Request | any, response: express.Response) => {
    const goalId = request.params.id;
    if (!isObjectIdValid(goalId)) {
        return response.status(400).send(ErrorMessage.ObjectIdError);
    }

    const updateGoalDtoObject: UpdateGoalDto = Object.assign(new UpdateGoalDto(), request.body);
    const { error } = validateUpdateGoalDto(updateGoalDtoObject);

    if (error) {
        return response.status(400).send(ErrorMessage.errorMessageFromJoiError(error));
    }

    let goal: Goal = GoalMapper.ToGoalFromUpdateGoalDto(updateGoalDtoObject);

    try {
        goal = await goalRepository.updateGoal(goal, goalId, request.account._id);
    }
    catch (error) {
        if (error instanceof Error) return response.status(400).send(ErrorMessage.errorMessageFromString(error.message));
        else return response.status(500).send(ErrorMessage.ServerError);
    }

    if (!goal) {
        return response.status(500).send(ErrorMessage.ServerError);
    }

    response.send(GoalMapper.ToGoalDto(goal));
});

goalRouter.delete("/:id", jwtAuth, async (request: express.Request | any, response: express.Response) => {
    const goalId = request.params.id;
    if (!isObjectIdValid(goalId)) {
        return response.status(400).send(ErrorMessage.ObjectIdError);
    }

    let goal: Goal;

    try {
        goal = await goalRepository.deleteGoal(goalId, request.account._id);
    }
    catch (error) {
        if (error instanceof Error) return response.status(400).send(ErrorMessage.errorMessageFromString(error.message));
        else return response.status(500).send(ErrorMessage.ServerError);
    }
    if (!goal) {
        return response.status(500).send(ErrorMessage.ServerError);
    }
    response.send(GoalMapper.ToGoalDto(goal));
})

goalRouter.post("/:id/pay", jwtAuth, async (request: express.Request | any, response: express.Response) => {
    const goalId = request.params.id;
    if (!isObjectIdValid(goalId)) {
        return response.status(400).send(ErrorMessage.ObjectIdError);
    }

    const addGoalPaymentDtoObject: AddGoalPaymentDto = Object.assign(new AddGoalPaymentDto(), request.body);
    const { error } = validateAddGoalPaymentDto(addGoalPaymentDtoObject);

    if (error) {
        return response.status(400).send(ErrorMessage.errorMessageFromJoiError(error));
    }

    let goal: Goal;

    try {
        goal = await goalService.payGoal(goalId, request.account._id, GoalMapper.ToGoalPaymentDtoFromAddGoalPaymentDto(addGoalPaymentDtoObject));
    }
    catch (error) {
        if (error instanceof Error) return response.status(400).send(ErrorMessage.errorMessageFromString(error.message));
        else return response.status(500).send(ErrorMessage.ServerError);
    }
    if (!goal) {
        return response.status(500).send(ErrorMessage.ServerError);
    }
    response.send(GoalMapper.ToGoalDto(goal));
})

export default goalRouter;

// income/expense for a given time range.
// notification clear all unread to read.
// notification delete all