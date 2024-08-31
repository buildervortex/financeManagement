import RegisterDto from '../dto/account/registerDto';
import AccountDto from '../dto/account/accountDto';
import Account from '../model/account';
import LoginDto from '../dto/account/loginDto';

export default class AccountMapper {
    static ToUserFromRegisterDto(registerDto: RegisterDto): Account {
        const user = new Account();
        user.email = registerDto.email;
        user.password = registerDto.password;
        user.userName = registerDto.userName;
        user.fullName = registerDto.fullName;

        return user;
    }

    static ToUserFromloginDto(loginDto: LoginDto): Account {
        const user = new Account();
        user.email = loginDto.email;
        user.password = loginDto.password;
        return user;
    }


    static ToUserDto(user: Account): AccountDto {
        const userDto = new AccountDto();
        userDto.email = user.email;
        userDto.userName = user.userName;
        userDto.id = user.id;
        return userDto;
    }
}