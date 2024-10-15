import Joi from "joi";

class UpdateGoalDto {
    name?: string;
    description?: string;
    remindBeforeDays?: number;
}

export function validateUpdateGoalDto(updateGoalDto: UpdateGoalDto): Joi.ValidationResult {
    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        description: Joi.string().min(5).max(250),
        remindBeforeDays: Joi.number().integer().min(1)
    })
    return schema.validate(updateGoalDto);
}

export default UpdateGoalDto;