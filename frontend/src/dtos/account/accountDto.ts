import Joi from "joi";

class AccountDto {
    userName: string = "";
    email: string = "";
    id: string = ""
}

export function validateAccountDto(accountDto: AccountDto): Joi.ValidationResult {
    const schema = Joi.object({
        userName: Joi.string().min(5).max(50).required(),
        email: Joi.string().required().email(),
        id:Joi.string()
    })

    return schema.validate(accountDto);
}

export default AccountDto;