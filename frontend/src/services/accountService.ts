import RegisterAccount from "../types/RegisterAccount";
import Account from "../types/Account";
import Api from "./api";

export default class AccountService {
    static async registerAccount(registerAccount: RegisterAccount): Promise<Account> {
        const response = await Api.post<Account>("/accounts/register", registerAccount);
        return response.data;
    }
}