import Joi from "joi";

class AddGoalPaymentDto {
    amount: number = 0;
}

export function validateAddGoalPaymentDto(addGoalPaymentDto: AddGoalPaymentDto): Joi.ValidationResult {
    const schema = Joi.object({
        amount: Joi.number().min(1).required()
    })

    return schema.validate(addGoalPaymentDto);
}

export default AddGoalPaymentDto;