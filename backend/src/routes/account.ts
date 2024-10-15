import express from "express"
import { validateRegisterDto } from "../dto/account/registerDto";
import { validateLoginDto } from "../dto/account/loginDto";
import ErrorMessage from "../model/error";
import AccountRepository from "../repositories/accountRepository";
import AccountMapper from "../mappers/accountMapper";
import Account from "../model/account";
import Cryptography from "../util/hashing";
import SubscriptionService from "../services/subscription";
import { accountNotification } from "../services/notificationService";
import NotificationUtils from "../util/notification";
import jwtAuth from "../middleware/jwtAuth";

const accountRouter = express.Router();
const accountRespository = new AccountRepository();
const subscriptionService = new SubscriptionService();

accountRouter.post("/register", async (request: express.Request, response: express.Response) => {

    const { error } = validateRegisterDto(request.body);

    if (error) {
        return response.status(400).send(ErrorMessage.errorMessageFromJoiError(error));
    }

    let account: Account;

    try {

        account = AccountMapper.ToAccountFromRegisterDto(request.body)
        // hash the password
        account.password = await Cryptography.hasPassword(account.password);
        account = await accountRespository.createAccount(account);
    }
    catch (error) {
        if (error instanceof Error) return response.status(400).send(ErrorMessage.errorMessageFromString(error.message));
        else return response.status(500).send(ErrorMessage.ServerError);
    }

    if (!account) {
        return response.status(500).send(ErrorMessage.ServerError);
    }

    // create the jwt token
    const token = account.generateAuthToken()

    response.header("x-auth-token", token);

    response.send(AccountMapper.ToAccountDto(account));

});

accountRouter.post("/login", async (request: express.Request, response: express.Response) => {
    const { error } = validateLoginDto(request.body);

    if (error) {
        return response.status(400).send(ErrorMessage.errorMessageFromJoiError(error));
    }

    let account: Account;

    try {
        account = await accountRespository.loginAccount(AccountMapper.ToAccountFromloginDto(request.body));
    }
    catch (error) {
        if (error instanceof Error) return response.status(400).send(ErrorMessage.errorMessageFromString(error.message));
        else return response.status(500).send(ErrorMessage.ServerError);
    }

    if (!account) {
        return response.status(500).send(ErrorMessage.ServerError);
    }

    const valid = await Cryptography.isValidPassword(account.password, request.body.password);
    if (!valid) return response.status(400).send(ErrorMessage.errorMessageFromString("Invalid email or password"));

    // create the jwt token
    const token = account.generateAuthToken()

    await accountNotification(account);

    response.header("x-auth-token", token);

    response.send(AccountMapper.ToAccountDto(account));

    // run services
    subscriptionService.handleSubscriptionDueDates(account.id);
})

accountRouter.delete("/me", jwtAuth, async (request: express.Request | any, response: express.Response) => {
    let account: Account;

    try {
        account = await accountRespository.deleteAccount(request.account._id);
    }
    catch (error) {
        if (error instanceof Error) return response.status(400).send(ErrorMessage.errorMessageFromString(error.message));
        else return response.status(500).send(ErrorMessage.ServerError);
    }
    if (!account) {
        return response.status(500).send(ErrorMessage.ServerError);
    }

    return response.send(AccountMapper.ToAccountDto(account));
})

accountRouter.get("/me", jwtAuth, async (request: express.Request | any, response: express.Response) => {
    let account: Account;

    try {
        account = await accountRespository.getAccount(request.account._id);
    }
    catch (error) {
        if (error instanceof Error) return response.status(400).send(ErrorMessage.errorMessageFromString(error.message));
        else return response.status(500).send(ErrorMessage.ServerError);
    }
    if (!account) {
        return response.status(500).send(ErrorMessage.ServerError);
    }

    return response.send(AccountMapper.ToAccountDto(account));
})

export default accountRouter;