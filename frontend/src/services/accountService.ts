import RegisterAccount from "../types/RegisterAccount";
import LoginAccount from "../types/LoginAccount";
import Account from "../types/Account";
import ErrorMessage from "../viewModels/error";
import Api from "./api";
import Cast from "../utils/cast";

export default class AccountService {
    static async registerAccount(registerAccount: RegisterAccount): Promise<Account | ErrorMessage> {
        const response = await Api.post<Account | ErrorMessage>("/accounts/register", registerAccount);
        return Cast.errorMessageCast(response);
    }
    static async loginAccount(loginAccount: LoginAccount): Promise<Account | ErrorMessage> {
        const response = await Api.post<any>("/accounts/login", loginAccount);
        return Cast.errorMessageCast(response);
    }

}