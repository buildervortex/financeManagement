import Joi from "joi";

class AddGoalDto {
    name?: string;
    description?: string;
    targetAmount?: number;
    startDate?: Date = new Date();
    deadline?: Date;
    remindBeforeDays?: number;
}

export function validateAddGoalDto(addGoalDto: AddGoalDto): Joi.ValidationResult {
    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        description: Joi.string().min(5).max(250),
        targetAmount: Joi.number().min(1).required(),
        startDate: Joi.date().required(),
        deadline: Joi.date().greater(Joi.ref("startDate")),
        remindBeforeDays: Joi.number().integer().min(1).default(1).when("deadline", {
            is: Joi.exist(),
            then: Joi.custom((value, helper) => {
                const { deadline, startDate } = helper.state.ancestors[0];
                const duration = (new Date(deadline).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24);
                if (value >= duration) {
                    return helper.error("remindBeforeDays should be less than the difference between deadline and startDate")
                }
                return value;
            }),
            otherwise: Joi.forbidden()
        })
    })
    return schema.validate(addGoalDto);
}
export default AddGoalDto;