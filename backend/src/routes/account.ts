import express from "express"
import { validateRegisterDto } from "../dto/account/registerDto";
import ErrorMessage from "../model/error";
import AccountRepository from "../repositories/accountRepository";
import AccountMapper from "../mappers/accountMapper";
import Account from "../model/account";

const accountRouter = express.Router();
const accountRespository = new AccountRepository();

accountRouter.post("/register", async (request: express.Request, response: express.Response) => {
    const { error } = validateRegisterDto(request.body);

    if (error) {
        return response.status(400).send(ErrorMessage.errorMessageFromJoiError(error));
    }

    let user: Account;

    try {
        user = await accountRespository.createAccount(AccountMapper.ToUserFromRegisterDto(request.body));
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

    response.send(AccountMapper.ToUserDto(user));
})

export default accountRouter;