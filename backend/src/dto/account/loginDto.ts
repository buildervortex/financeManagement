import Joi from "joi";

class LoginDto {
    email: string  = "";
    password: string  = "";
}

export function validateLoginDto(LoginDto: LoginDto): Joi.ValidationResult {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().min(5).max(255).required()
    })

    return schema.validate(LoginDto);
}

export default LoginDto;