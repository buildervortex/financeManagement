import express from "express"
import jwtAuth from "../middleware/jwtAuth";
import SubscrpitionRepository from "../repositories/subscriptionRepository";
import { isObjectIdValid } from "../util/validate";
import ErrorMessage from "../model/error";
import Subscription from "../model/subscriptions";
import SubscriptionMapper from "../mappers/subscriptionMapper";
import { validateAddSubscriptionDto } from "../dto/subscription/addSusbscriptionDto";
import { validateUpdateSubscriptionDto } from "../dto/subscription/updateSubscriptionDto";
import Expense from "../model/expense";
import SubscriptionUtils from "../util/subscriptionUtils";

const subscriptionRouter = express.Router();
const subscriptionRepository = new SubscrpitionRepository();

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
    const { error } = validateAddSubscriptionDto(request.body);

    if (error) {
        return response.status(400).send(ErrorMessage.errorMessageFromJoiError(error));
    }

    let subscription: Subscription = SubscriptionMapper.ToSubscriptionFromAddSubscriptionDto(request.body);

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

    const { error } = validateUpdateSubscriptionDto(request.body);

    if (error) {
        return response.status(400).send(ErrorMessage.errorMessageFromJoiError(error));
    }

    let subscription: Subscription = SubscriptionMapper.ToSubscriptionFromAddSubscriptionDto(request.body);

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
})

export default subscriptionRouter;