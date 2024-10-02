import { FunctionComponent, useState, useEffect } from 'react';
import InputForm from '../components/inputForm';
import GoalsViewModel from '../viewModels/GoalsViewModel';
import { handleErrorResult, handleSuccessResult } from '../utils/errorMessage';
import ErrorMessage from '../viewModels/error';
import UpdateGoalDto, { validateUpdateGoalDto } from '../dtos/goal/updateGoalDto';
import GoalDto from '../dtos/goal/goalDto';
import { useLocation } from 'react-router-dom';

interface UpdateGoalPageProps {}

interface LocationState {
    goal: GoalDto;
}

interface InputElement {
    labelContent: string;
    value?: any;
    checked?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type: string;
    name: string;
    id: string;
    className: string;
    placeholder?: string;
}

const GoalUpdatePage: FunctionComponent<UpdateGoalPageProps> = () => {
    const location = useLocation();
    const { goal } = location.state as LocationState;

    // State management for goal attributes
    const [name, setName] = useState<string>(goal.name || "");
    const [description, setDescription] = useState<string>(goal.description || "");
    const [currencyType, setCurrencyType] = useState<string>(goal.currencyType || "LKR");
    const [remindBeforeDays, setRemindBeforeDays] = useState<number | undefined>(goal.remindBeforeDays || undefined);

    useEffect(() => {
        setName(goal.name || "");
        setDescription(goal.description || "");
        setCurrencyType(goal.currencyType || "LKR");
        setRemindBeforeDays(goal.remindBeforeDays || undefined);
    }, [goal]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const updateGoalDto: UpdateGoalDto = {
            name,
            description,
            currencyType,
            remindBeforeDays,
        };

        // Validate the data before submitting
        const { error } = validateUpdateGoalDto(updateGoalDto);
        if (error) {
            handleErrorResult(new ErrorMessage(error.details[0].message));
            return;
        }

        const result = await new GoalsViewModel().updateGoal(updateGoalDto, goal.id || "");
        if (result instanceof ErrorMessage) {
            handleErrorResult(result);
        } else {
            handleSuccessResult('Goal Updated Successfully');
        }

        // Clear the form fields
        setName("");
        setDescription("");
        setCurrencyType("LKR");
        setRemindBeforeDays(undefined);
    };

    const inputElements: InputElement[] = [
        {
            labelContent: 'Goal Name',
            value: name,
            onChange: (e) => setName(e.target.value),
            type: "text",
            name: "name",
            id: "name",
            className: "bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5",
            placeholder: "Enter Goal Name"
        },
        {
            labelContent: 'Description',
            value: description,
            onChange: (e) => setDescription(e.target.value),
            type: "text",
            name: "description",
            id: "description",
            className: "bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5",
            placeholder: "Enter Description"
        },
        {
            labelContent: 'Currency Type',
            value: currencyType,
            onChange: (e) => setCurrencyType(e.target.value),
            type: "text",
            name: "currencyType",
            id: "currencyType",
            className: "bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5",
            placeholder: "Enter Currency Type"
        },
        {
            labelContent: 'Remind Before Days',
            value: remindBeforeDays ?? '',
            onChange: (e) => setRemindBeforeDays(e.target.value ? parseInt(e.target.value) : undefined),
            type: "number",
            name: "remindBeforeDays",
            id: "remindBeforeDays",
            className: "bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5",
            placeholder: "Enter Days for Reminder"
        }
    ];

    return (
        <InputForm
            formName='Update Goal Information'
            submitButton='Submit'
            inputs={inputElements}
            onSubmit={handleSubmit}
        />
    );
};

export default GoalUpdatePage;
