import RegisterAccount from "../types/RegisterAccount";
import LoginAccount from "../types/LoginAccount";
import Account from "../types/Account";
import Api from "./api";

export default class AccountService {
    static async registerAccount(registerAccount: RegisterAccount): Promise<Account> {
        const response = await Api.post<Account>("/accounts/register", registerAccount);
        return response.data;
    }
    static async loginAccount(loginAccount: LoginAccount): Promise<Account> {
        const response = await Api.post<Account>("/accounts/login", loginAccount);
        return response.data;
    }
}