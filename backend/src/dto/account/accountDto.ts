import Joi from "joi";

class AccountDto {
    userName: string = "";
    email: string = "";
}

export function validateRegisterDto(accountDto: AccountDto): Joi.ValidationResult {
    const schema = Joi.object({
        userName: Joi.string().min(5).max(50).required(),
        email: Joi.string().required().email()
    })

    return schema.validate(accountDto);
}

export default AccountDto;