import { FunctionComponent, useState, useEffect } from 'react';
import InputForm from '../components/inputForm';
import ExpenseViewModel from '../viewModels/ExpenseViewModel';
import { handleErrorResult,handleSuccessResult } from '../utils/errorMessage';
import ErrorMessage from '../viewModels/error';
import updateExpenseDto from '../dtos/expense/updateExpenseDto';
import ExpenseDto from '../dtos/expense/expenseDto';
import { useLocation } from 'react-router-dom';

interface updateExpensePageProps {}

interface LocationState {
    expense: ExpenseDto;
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

const ExpenseUpdatePage: FunctionComponent<updateExpensePageProps> = () => {
    const location = useLocation();
    const { expense } = location.state as LocationState;

    // Provide default values to prevent issues when the fields are undefined
    const [name, setName] = useState<string>(expense.name || "");
    const [description, setDescription] = useState<string>(expense.description || "");
    const [amount, setAmount] = useState<number>(expense.amount || 0);
    const [paid, setPaid] = useState<boolean>(expense.paid || false);
    const [currencyType, setCurrencyType] = useState<string>(expense.currencyType || "");

    useEffect(() => {
        setName(expense.name || "");
        setDescription(expense.description || "");
        setAmount(expense.amount || 0);
        setPaid(expense.paid || false);
        setCurrencyType(expense.currencyType || "");
    }, [expense]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const updateexpenseDto: updateExpenseDto = new updateExpenseDto();
        updateexpenseDto.name = name;
        updateexpenseDto.description = description;
        updateexpenseDto.amount = amount;
        updateexpenseDto.paid = paid;
        updateexpenseDto.currencyType = currencyType;

        const result = await new ExpenseViewModel().updateExpense(updateexpenseDto, expense.id || "");
        if (result instanceof ErrorMessage) {
            handleErrorResult(result);
        }else {
            handleSuccessResult('Expences Updated Successfully')
          }

        // Clear the form fields
        setName("");
        setDescription("");
        setAmount(0);
        setPaid(false);
        setCurrencyType("");
    };

    const inputElements: InputElement[] = [
        {
            labelContent: 'Expense Name',
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
            labelContent: 'Amount',
            value: amount,
            onChange: (e) => setAmount(parseFloat(e.target.value)),
            type: "number",
            name: "amount",
            id: "amount",
            className: "bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5",
            placeholder: "Enter Amount"
        },
        {
            labelContent: 'Paid',
            checked: paid,
            onChange: (e) => setPaid(e.target.checked),
            type: "checkbox",
            name: "paid",
            id: "paid",
            className: "mx-3 mr-2 leading-tight",
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
        }
    ];

    return (
        <InputForm
            formName='Update Expense Information'
            submitButton='Submit'
            inputs={inputElements}
            onSubmit={handleSubmit}
        />
    );
};

export default ExpenseUpdatePage;
