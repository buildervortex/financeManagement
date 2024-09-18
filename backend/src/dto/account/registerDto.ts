import Joi from "joi";

class RegisterDto {
    userName?: string
    fullName?: string
    email?: string
    password?: string
}

export function validateRegisterDto(registerDto: RegisterDto): Joi.ValidationResult {
    const schema = Joi.object({
        userName: Joi.string().min(5).max(20).required(),
        fullName: Joi.string().min(5).max(50).required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(5).max(255).required()
    })

    return schema.validate(registerDto);
}

export default RegisterDto;