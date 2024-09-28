import { FunctionComponent, useState, useEffect } from 'react';
import InputForm from '../components/inputForm';
import IncomeViewModel from '../viewModels/IncomeViewModel';
import { handleErrorResult, handleSuccessResult } from '../utils/errorMessage';
import ErrorMessage from '../viewModels/error';
import updateIncomeDto from '../dtos/income/updateIncomeDto';
import IncomeDto from '../dtos/income/incomeDto';
import { useLocation} from 'react-router-dom';

interface updateIncomePageProps {}

interface LocationState {
    income: IncomeDto;
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

const IncomeupdatePage: FunctionComponent<updateIncomePageProps> = () => {
    const location = useLocation();
    const { income } = location.state as LocationState;
    const [name, setName] = useState<string>(income.name);
    const [description, setDescription] = useState<string>(income.description);
    const [amount, setAmount] = useState<number>(income.amount);
    const [monthly, setMonthly] = useState<boolean>(income.monthly);
    const [incomeDate, setIncomeDate] = useState<number>(income.monthlyDate ?? 0);
    const [currencyType, setCurrencyType] = useState<string>(income.currencyType);

    useEffect(() => {
        setName(income.name);
        setDescription(income.description);
        setAmount(income.amount);
        setMonthly(income.monthly);
        setIncomeDate(income.monthlyDate ?? 0);
        setCurrencyType(income.currencyType);
    }, [income]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const updateincomeDto: updateIncomeDto = new updateIncomeDto();
        updateincomeDto.name = name;
        updateincomeDto.description = description;
        updateincomeDto.amount = amount;
        updateincomeDto.monthly = monthly;
        updateincomeDto.monthlyDate = incomeDate;
        updateincomeDto.currencyType = currencyType;
        const result = await new IncomeViewModel().updateIncome(updateincomeDto, income.id)
        if (result instanceof ErrorMessage) {
            handleErrorResult(result);
        }else {
            handleSuccessResult('Income Updated Successfully')
          } 

        // Clear the form fields
        setName("");
        setDescription("");
        setAmount(0);
        setMonthly(false);
        setIncomeDate(0);
        setCurrencyType("");
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
            labelContent: 'Monthly',
            checked: monthly,
            onChange: (e) => setMonthly(e.target.checked),
            type: "checkbox",
            name: "monthly",
            id: "monthly",
            className: "mx-3 mr-2 leading-tight",
        },
        ...(monthly ? [
            {
                labelContent: 'Income Date',
                value: incomeDate,
                onChange: (e:any) => setIncomeDate(parseInt(e.target.value)),
                type: "number",
                name: "incomeDate",
                id: "incomeDate",
                className: "bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5",
                placeholder: "Enter Income Date"
            }
        ] : []),
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
            formName='Update Income Information'
            submitButton='Submit'
            inputs={inputElements}
            onSubmit={handleSubmit}
        />
    );
};

export default IncomeupdatePage;
