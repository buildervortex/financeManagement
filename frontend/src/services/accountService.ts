import RegisterAccount from "../types/RegisterAccount";
import LoginAccount from "../types/LoginAccount";
import Account from "../types/Account";
import ErrorMessage from "../viewModels/error";
import Api from "./api";

export default class AccountService {
    static async registerAccount(registerAccount: RegisterAccount): Promise<Account|ErrorMessage> {
        const response = await Api.post<Account|ErrorMessage>("/accounts/register", registerAccount);
        return response.data;
    }
    static async loginAccount(loginAccount: LoginAccount): Promise<Account|ErrorMessage>  {
        const response = await Api.post<Account|ErrorMessage>("/accounts/login", loginAccount);
        return response.data;
    }
}