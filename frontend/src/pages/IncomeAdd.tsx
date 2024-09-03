import { FunctionComponent, useState } from 'react';
import InputForm from '../components/inputForm';

interface AccountLoginPageProps {}

const IncomeAddPage: FunctionComponent<AccountLoginPageProps> = () => {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [amount, setAmount] = useState<number | "">("");
    const [monthly, setMonthly] = useState<boolean>(false);
    const [incomeDate, setIncomeDate] = useState<string>("");
    const [currencyType, setCurrencyType] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Your submit logic here
    };

    // Input elements configuration
    const inputElements = [
        {
            labelContent: 'Name',
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value),
            type: "text",
            name: "name",
            id: "name",
            className: "bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5 ",
            placeholder: "Enter Name"
        },
        {
            labelContent: 'Description',
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value),
            type: "text",
            name: "description",
            id: "description",
            className: "bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5 ",
            placeholder: "Enter Description"
        },
        {
            labelContent: 'Amount',
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setAmount(parseFloat(e.target.value) || ""),
            type: "number",
            name: "amount",
            id: "amount",
            className: "bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5 ",
            placeholder: "Enter Amount"
        },
        {
            labelContent: 'Monthly ',
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setMonthly(e.target.checked),
            type: "checkbox",
            name: "monthly",
            id: "monthly",
            className: "mr-2 leading-tight",
            placeholder: ""
        },
        ...(
            monthly ? [
                {
                    labelContent: 'Income Date',
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setIncomeDate(e.target.value),
                    type: "number",
                    name: "incomeDate",
                    id: "incomeDate",
                    className: "bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5 ",
                    placeholder: "Enter Income date"
                }
            ] : []
        ),
        {
            labelContent: 'Currency Type',
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setCurrencyType(e.target.value),
            type: "text",
            name: "currencyType",
            id: "currencyType",
            className: "bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5 ",
            placeholder: "Enter Currency Type"
        }
    ];

    return (
        <InputForm 
            formName='Add Income Information' 
            submitButton='Submit' 
            inputs={inputElements} 
            onSubmit={handleSubmit}
        />
    );
};

export default IncomeAddPage;
