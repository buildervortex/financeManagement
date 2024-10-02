import { FunctionComponent, useState, useEffect } from 'react';
import InputForm from '../components/inputForm';
import GoalViewModel from '../viewModels/GoalsViewModel';
import AddGoalPaymentDto from "../dtos/goal/addGoalPaymentDto";
import { handleErrorResult,handleSuccessResult } from '../utils/errorMessage';
import ErrorMessage from '../viewModels/error';

interface AddGoalPaymentProps { }

interface InputElement {
    labelContent: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type: string;
    name: string;
    id: string;
    className: string;
    placeholder: string;
}


const AddGoalPayment: FunctionComponent<AddGoalPaymentProps> = () => {
    const [amount, setAmount] = useState<number>(0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const addGoalPaymentDto: AddGoalPaymentDto = new AddGoalPaymentDto();
        addGoalPaymentDto.amount = amount;
        const result = await new GoalViewModel().addGoalPayment(addGoalPaymentDto, '1');
        if (result instanceof ErrorMessage) {
            handleErrorResult(result);
        }else {
            handleSuccessResult('Goal Added Successfully')
          }
           setAmount(0);
    }
    const inputElements: InputElement[] = [
        {
            labelContent: 'Goal Payment Amount',
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setAmount(parseFloat(e.target.value)),
            type: 'number',
            name: 'amount',
            id: 'amount',
            className: 'bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5',
            placeholder: 'Enter Goal Payment Amount'
        },]

    return (
        <>
            <InputForm
                formName='Add Goal Payment'
                submitButton='Submit'
                inputs={inputElements}
                onSubmit={handleSubmit}
            /></>
    );
};

export default AddGoalPayment;