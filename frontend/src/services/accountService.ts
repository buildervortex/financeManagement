import ErrorMessage from "../viewModels/error";
import Api from "./api";
import Cast from "../utils/cast";
import RegisterDto from "../dtos/account/registerDto";
import AccountDto from "../dtos/account/accountDto";
import loginDto from "../dtos/account/loginDto";

export default class AccountService {
    static async registerAccount(registerAccountDto: RegisterDto): Promise<AccountDto | ErrorMessage> {
        const response = await Api.post<AccountDto | ErrorMessage>("/accounts/register", registerAccountDto);
        return Cast.errorMessageCast(response);
    }
    static async loginAccount(loginAccountDto: loginDto): Promise<AccountDto | ErrorMessage> {
        const response = await Api.post<any>("/accounts/login", loginAccountDto);
        return Cast.errorMessageCast(response);
    }

    static async getAccount(): Promise<AccountDto | ErrorMessage> {
        const response = await Api.get<AccountDto | ErrorMessage>("/accounts/me");
        return Cast.errorMessageCast(response);
    }
}