import Joi from "joi";

class LoginDto {
    email: string  = "";
    password: string  = "";
}

export function validateLoginDto(loginDto: LoginDto): Joi.ValidationResult {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().min(5).max(255).required()
    })

    return schema.validate(loginDto);
}

export default LoginDto;