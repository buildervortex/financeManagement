import Joi from "joi";

class loginDto {
    email: string  = "";
    password: string  = "";
}

export function validateloginDto(loginDto: loginDto): Joi.ValidationResult {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().min(5).max(255).required()
    })

    return schema.validate(loginDto);
}

export default loginDto;