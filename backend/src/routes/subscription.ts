import express from "express"
import jwtAuth from "../middleware/jwtAuth";
import SubscrpitionRepository from "../repositories/subscriptionRepository";
import { isObjectIdValid } from "../util/validate";
import ErrorMessage from "../model/error";
import Subscription from "../model/subscriptions";
import SubscriptionMapper from "../mappers/subscriptionMapper";
import AddSubscriptionDto, { validateAddSubscriptionDto } from "../dto/subscription/addSusbscriptionDto";
import UpdateSubscriptionDto, { validateUpdateSubscriptionDto } from "../dto/subscription/updateSubscriptionDto";
import Expense from "../model/expense";
import SubscriptionUtils from "../util/subscriptionUtils";
import SubscriptionService from "../services/subscription";
import ExpenseMapper from "../mappers/expenseMapper";

const subscriptionRouter = express.Router();
const subscriptionRepository = new SubscrpitionRepository();
const subscriptionService = new SubscriptionService();

subscriptionRouter.get("/categories", jwtAuth, async (request: express.Request | any, response: express.Response) => {
    let categories: String[];
    try {
        categories = await subscriptionRepository.getAllCategories(request.account._id);
    }
    catch (error) {
        if (error instanceof Error) return response.status(400).send(ErrorMessage.errorMessageFromString(error.message));
        else return response.status(500).send(ErrorMessage.ServerError);
    }

    response.send(categories);
})

subscriptionRouter.get("/:id", jwtAuth, async (request: express.Request | any, response: express.Response) => {
    const subscriptionId = request.params.id;
    if (!isObjectIdValid(subscriptionId)) {
        return response.status(400).send(ErrorMessage.ObjectIdError);
    }

    let subscription: Subscription;

    try {
        subscription = await subscriptionRepository.getSubscription(subscriptionId, request.account._id);
    }
    catch (error) {
        if (error instanceof Error) return response.status(400).send(ErrorMessage.errorMessageFromString(error.message));
        else return response.status(500).send(ErrorMessage.ServerError);
    }
    if (!subscription) {
        return response.status(500).send(ErrorMessage.ServerError);
    }
    response.send(SubscriptionMapper.ToSubscriptionDto(subscription));
})

subscriptionRouter.get("/", jwtAuth, async (request: express.Request | any, response: express.Response) => {
    let subscriptions: Subscription[];

    try {
        subscriptions = await subscriptionRepository.getSubscriptions(request.account._id);
    }
    catch (error) {
        if (error instanceof Error) return response.status(400).send(ErrorMessage.errorMessageFromString(error.message));
        else return response.status(500).send(ErrorMessage.ServerError);
    }

    if (!subscriptions) {
        return response.status(500).send(ErrorMessage.ServerError);
    }

    response.send(subscriptions.map(subscription => SubscriptionMapper.ToSubscriptionDto(subscription)));
})




subscriptionRouter.post("/", jwtAuth, async (request: express.Request | any, response: express.Response) => {
    const addSubscriptionDtoObject: AddSubscriptionDto = Object.assign(new AddSubscriptionDto(), request.body);
    const { error } = validateAddSubscriptionDto(addSubscriptionDtoObject);

    if (error) {
        return response.status(400).send(ErrorMessage.errorMessageFromJoiError(error));
    }

    let subscription: Subscription = SubscriptionMapper.ToSubscriptionFromAddSubscriptionDto(addSubscriptionDtoObject);

    try {
        SubscriptionUtils.setInitialNextInstallmentDate(subscription);
        subscription = await subscriptionRepository.addSubscription(subscription, request.account._id);
    }
    catch (error) {
        if (error instanceof Error) return response.status(400).send(ErrorMessage.errorMessageFromString(error.message));
        else return response.status(500).send(ErrorMessage.ServerError);
    }

    if (!subscription) {
        return response.status(500).send(ErrorMessage.ServerError);
    }

    response.send(SubscriptionMapper.ToSubscriptionDto(subscription));
});

subscriptionRouter.put("/:id", jwtAuth, async (request: express.Request | any, response: express.Response) => {
    const subscriptionId = request.params.id;
    if (!isObjectIdValid(subscriptionId)) {
        return response.status(400).send(ErrorMessage.ObjectIdError);
    }

    const updateSubscriptionDtoObject: UpdateSubscriptionDto = Object.assign(new UpdateSubscriptionDto(), request.body);
    const { error } = validateUpdateSubscriptionDto(updateSubscriptionDtoObject);

    if (error) {
        return response.status(400).send(ErrorMessage.errorMessageFromJoiError(error));
    }

    let subscription: Subscription = SubscriptionMapper.ToSubscriptionFromUpdateSubscriptionDto(updateSubscriptionDtoObject);

    try {
        subscription = await subscriptionRepository.updateSubscription(subscription, subscriptionId, request.account._id);
    }
    catch (error) {
        if (error instanceof Error) return response.status(400).send(ErrorMessage.errorMessageFromString(error.message));
        else return response.status(500).send(ErrorMessage.ServerError);
    }

    if (!subscription) {
        return response.status(500).send(ErrorMessage.ServerError);
    }

    response.send(SubscriptionMapper.ToSubscriptionDto(subscription));
});

subscriptionRouter.delete("/:id", jwtAuth, async (request: express.Request | any, response: express.Response) => {
    const subscriptionId = request.params.id;
    if (!isObjectIdValid(subscriptionId)) {
        return response.status(400).send(ErrorMessage.ObjectIdError);
    }

    let subscription: Subscription;

    try {
        subscription = await subscriptionRepository.deleteSubscription(subscriptionId, request.account._id);
    }
    catch (error) {
        if (error instanceof Error) return response.status(400).send(ErrorMessage.errorMessageFromString(error.message));
        else return response.status(500).send(ErrorMessage.ServerError);
    }
    if (!subscription) {
        return response.status(500).send(ErrorMessage.ServerError);
    }
    response.send(SubscriptionMapper.ToSubscriptionDto(subscription));
})

subscriptionRouter.post("/:id/pay", jwtAuth, async (request: express.Request | any, response: express.Response) => {
    const subscriptionId = request.params.id;
    if (!isObjectIdValid(subscriptionId)) {
        return response.status(400).send(ErrorMessage.ObjectIdError);
    }

    let expense: Expense;

    try {
        expense = await subscriptionService.paySubscription(subscriptionId, request.account._id);
    }
    catch (error) {
        if (error instanceof Error) return response.status(400).send(ErrorMessage.errorMessageFromString(error.message));
        else return response.status(500).send(ErrorMessage.ServerError);
    }

    response.send(ExpenseMapper.ToExpenseDto(expense));
})

export default subscriptionRouter;