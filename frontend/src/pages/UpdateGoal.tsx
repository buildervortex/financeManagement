import { FunctionComponent, useState, useEffect } from 'react';
import InputForm from '../components/inputForm';
import GoalViewModel from '../viewModels/GoalsViewModel';
import { handleErrorResult, handleSuccessResult } from '../utils/errorMessage';
import ErrorMessage from '../viewModels/error';
import UpdateGoalDto from '../dtos/goal/updateGoalDto';
import GoalDto from '../dtos/goal/goalDto';
import { useLocation} from 'react-router-dom';

interface updateGoalPageProps {}

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

const UpdateGoal: FunctionComponent<updateGoalPageProps> = () => {
    const location = useLocation();
    const { goal } = location.state as LocationState;
    const [name, setName] = useState<string|undefined>(goal.name);
    const [description, setDescription] = useState<string|undefined>(goal.description);
    const [currencyType, setCurrencyType] = useState<string|undefined>(goal.currencyType);
    const [remindBeforeDays, setRemindBeforeDays] = useState<number|undefined>(goal.remindBeforeDays);

    useEffect(() => {
        setName(goal.name);
        setDescription(goal.description);
        setCurrencyType(goal.currencyType);
        setRemindBeforeDays(goal.remindBeforeDays);
    }, [goal]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const goalId = goal.id ?? ''; 
        const updateGoalDto: UpdateGoalDto = new UpdateGoalDto();
        updateGoalDto.name = name;
        updateGoalDto.description = description;
        updateGoalDto.currencyType = currencyType;
        updateGoalDto.remindBeforeDays = remindBeforeDays;
        const result = await new GoalViewModel().updateGoal(updateGoalDto, goalId)
        if (result instanceof ErrorMessage) {
            handleErrorResult(result);
        }else {
            handleSuccessResult('Goal Updated Successfully')
          } 

        // Clear the form fields
        setName("");
        setDescription("");
        setCurrencyType("");
        setRemindBeforeDays(1);
    };

    const inputElements:  InputElement[] = [
        {
            labelContent: 'Name',
            value: name,
            onChange: (e) => setName(e.target.value),
            type: "text",
            name: "name",
            id: "name",
            className: "bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5",
            placeholder: "Enter Name"
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
            value: remindBeforeDays,
            onChange: (e) => setRemindBeforeDays(parseInt(e.target.value, 10)),
            type: "number",
            name: "remindBeforeDays",
            id: "remindBeforeDays",
            className: "bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5",
            placeholder: "Enter Remind Before Days"
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

export default UpdateGoal;