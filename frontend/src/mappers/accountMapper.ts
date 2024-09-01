import AccountDto from "../dtos/account/accountDto";
import RegisterDto from "../dtos/account/registerDto";
import LoginDto from "../dtos/account/loginDto";
import Account from "../types/Account";
import RegisterAccount from "../types/RegisterAccount";
import LoginAccount from "../types/LoginAccount";

export default class AccountMapper {
    static ToAccountDto(account: Account): AccountDto {
        const accountDto = new AccountDto();
        accountDto.id = account.id;
        accountDto.email = account.email;
        accountDto.userName = account.userName;
        return accountDto;
    }

    static ToAccountFromAccountDto(accountDto: AccountDto): Account {
        const account: Account = {
            userName: accountDto.userName,
            email: accountDto.email,
            id: accountDto.id
        }

        return account;
    }

    static ToRegisterAccountFromRegisterDto(registerDto: RegisterDto): RegisterAccount {
        const registerAccount: RegisterAccount = {
            userName: registerDto.userName,
            fullName: registerDto.fullName,
            email: registerDto.email,
            password: registerDto.password
        }
        return registerAccount;
    }

    static ToLoginAccountFromloginDto(loginDto: LoginDto): LoginAccount {
        const loginAccount: LoginAccount = {
            email: loginDto.email,
            password: loginDto.password
        }
        return loginAccount;
    }

}