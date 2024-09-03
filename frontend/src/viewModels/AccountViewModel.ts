import AccountDto from "../dtos/account/accountDto";
import RegisterDto, { validateRegisterDto } from "../dtos/account/registerDto";
import LoginDto, { validateloginDto } from "../dtos/account/loginDto";
import AccountMapper from "../mappers/accountMapper";
import AccountService from "../services/accountService";
import RegisterAccount from "../types/RegisterAccount";
import LoginAccount from "../types/LoginAccount";
import ErrorMessage from "./error";

export default class AccountViewModel {
    async registerAccount(registerDto: RegisterDto): Promise<AccountDto | ErrorMessage> {
        const { error } = validateRegisterDto(registerDto);
        if (error)
            return ErrorMessage.errorMessageFromJoiError(error);
        const registerAccount: RegisterAccount = AccountMapper.ToRegisterAccountFromRegisterDto(registerDto);

            const response = await AccountService.registerAccount(registerAccount);
            if (response && typeof response === 'object' && 'error' in response) {
                return ErrorMessage.errorMessageFromString(response.error);
            }
            return AccountMapper.ToAccountDto(response); 
    }

    async loginAccount(loginDto: LoginDto): Promise<AccountDto | ErrorMessage> {
        const { error } = validateloginDto(loginDto);
        if (error)
            return ErrorMessage.errorMessageFromJoiError(error);
        const loginAccount: LoginAccount = AccountMapper.ToLoginAccountFromloginDto(loginDto);

            const response = await AccountService.loginAccount(loginAccount);
            if (response && typeof response === 'object' && 'error' in response) {
                return ErrorMessage.errorMessageFromString(response.error);
            }
            return AccountMapper.ToAccountDto(response);
    }
}