import AccountDto from "../dtos/account/accountDto";
import RegisterDto, { validateRegisterDto } from "../dtos/account/registerDto";
import AccountMapper from "../mappers/accountMapper";
import AccountService from "../services/accountService";
import RegisterAccount from "../types/RegisterAccount";
import ErrorMessage from "./error";

export default class AccountViewModel {
    async registerAccount(registerDto: RegisterDto): Promise<AccountDto | ErrorMessage> {
        const { error } = validateRegisterDto(registerDto);
        if (error)
            return ErrorMessage.errorMessageFromJoiError(error);
        const registerAccount: RegisterAccount = AccountMapper.ToRegisterAccountFromRegisterDto(registerDto);

        try {
            return await AccountService.registerAccount(registerAccount);
        }
        catch (error) {
            return ErrorMessage.errorMessageFromString("Failed to register user");
        }
    }
}