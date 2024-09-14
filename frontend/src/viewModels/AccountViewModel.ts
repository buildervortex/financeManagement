import AccountDto from "../dtos/account/accountDto";
import RegisterDto, { validateRegisterDto } from "../dtos/account/registerDto";
import LoginDto, { validateloginDto } from "../dtos/account/loginDto";
import AccountService from "../services/accountService";
import ErrorMessage from "./error";

export default class AccountViewModel {
    async registerAccount(registerDto: RegisterDto): Promise<AccountDto | ErrorMessage> {
        const { error } = validateRegisterDto(registerDto);
        if (error)
            return ErrorMessage.errorMessageFromJoiError(error);

        const response = await AccountService.registerAccount(registerDto);
        if (response && typeof response === 'object' && 'error' in response) {
            return ErrorMessage.errorMessageFromString(response.error);
        }
        return response;
    }

    async loginAccount(loginDto: LoginDto): Promise<AccountDto | ErrorMessage> {
        const { error } = validateloginDto(loginDto);
        if (error)
            return ErrorMessage.errorMessageFromJoiError(error);

        const response = await AccountService.loginAccount(loginDto);
        if (response && typeof response === 'object' && 'error' in response) {
            return ErrorMessage.errorMessageFromString(response.error);
        }
        return response;
    }
}