import express from "express"
import { validateRegisterDto } from "../dto/account/registerDto";
import { validateLoginDto } from "../dto/account/loginDto";
import ErrorMessage from "../model/error";
import AccountRepository from "../repositories/accountRepository";
import AccountMapper from "../mappers/accountMapper";
import Account from "../model/account";
import Cryptography from "../util/hashing";
import SubscriptionService from "../services/subscription";

const accountRouter = express.Router();
const accountRespository = new AccountRepository();
const subscriptionService = new SubscriptionService();

accountRouter.post("/register", async (request: express.Request, response: express.Response) => {

    const { error } = validateRegisterDto(request.body);

    if (error) {
        return response.status(400).send(ErrorMessage.errorMessageFromJoiError(error));
    }

    let user: Account;

    try {

        user = AccountMapper.ToAccountFromRegisterDto(request.body)
        // hash the password
        user.password = await Cryptography.hasPassword(user.password);
        user = await accountRespository.createAccount(user);
    }
    catch (error) {
        if (error instanceof Error) return response.status(400).send(ErrorMessage.errorMessageFromString(error.message));
        else return response.status(500).send(ErrorMessage.ServerError);
    }

    if (!user) {
        return response.status(500).send(ErrorMessage.ServerError);
    }

    // create the jwt token
    const token = user.generateAuthToken()

    response.header("x-auth-token", token);

    response.send(AccountMapper.ToAccountDto(user));

});

accountRouter.post("/login", async (request: express.Request, response: express.Response) => {
    const { error } = validateLoginDto(request.body);

    if (error) {
        return response.status(400).send(ErrorMessage.errorMessageFromJoiError(error));
    }

    let user: Account;

    try {
        user = await accountRespository.loginAccount(AccountMapper.ToAccountFromloginDto(request.body));
    }
    catch (error) {
        if (error instanceof Error) return response.status(400).send(ErrorMessage.errorMessageFromString(error.message));
        else return response.status(500).send(ErrorMessage.ServerError);
    }

    if (!user) {
        return response.status(500).send(ErrorMessage.ServerError);
    }

    const valid = await Cryptography.isValidPassword(user.password, request.body.password);
    if (!valid) return response.status(400).send(ErrorMessage.errorMessageFromString("Invalid email or password"));

    // create the jwt token
    const token = user.generateAuthToken()

    response.header("x-auth-token", token);

    response.send(AccountMapper.ToAccountDto(user));

    // run services
    subscriptionService.handleSubscriptionDueDates(user.id);
})

export default accountRouter;