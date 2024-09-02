import { FunctionComponent, useState } from 'react';
import InputForm from '../components/inputForm';


interface AccountLoginPageProps {
}

const IncomeAddPage: FunctionComponent<AccountLoginPageProps> = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [monthly, setMonthly] = useState("");
    const [date, setDate] = useState("");
    const [incomeDate, setIncomeDate] = useState("");
    const [currancyType, setCurrancyType] = useState("");

     const handleSubmit = async (e: React.FormEvent) => {

        } 

    

    let inputElements = [
        {
            labelContent: 'Name',
            onChange: (e: any) => setName(e.target.value),
            type: "string",
            name: "name",
            id: "name",
            className: "bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5 ",
            placeholder: "Name"
        },
        {
            labelContent: 'Description',
            onChange: (e: any) => setDescription(e.target.value),
            type: "string",
            name: "description",
            id: "description",
            className: "bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5 ",
            placeholder: "Description"
        },
        {
            labelContent: 'Amount',
            onChange: (e: any) => setAmount(e.target.value),
            type: "float",
            name: "amount",
            id: "amount",
            className: "bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5 ",
            placeholder: "Amount"
        },

        {
            labelContent: 'Monthly',
            onChange: (e: any) => setMonthly(e.target.value),
            type: "boolean",
            name: "monthly",
            id: "monthly",
            className: "bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5 ",
            placeholder: "Monthly"
        },

        {
            labelContent: 'Date',
            onChange: (e: any) => setDate(e.target.value),
            type: "date",
            name: "date",
            id: "date",
            className: "bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5 ",
            placeholder: "Date"
        },
        {
            labelContent: 'IncomeDate',
            onChange: (e: any) => setIncomeDate(e.target.value),
            type: "date",
            name: "incomeDate",
            id: "incomeDate",
            className: "bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5 ",
            placeholder: "IncomeDate"
        },

        {
            labelContent: 'CurrancyType',
            onChange: (e: any) => setCurrancyType(e.target.value),
            type: "string",
            name: "currancyType",
            id: "currancyType",
            className: "bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5 ",
            placeholder: "CurrancyType"
        }

    ]

    return (
        <InputForm formName='Login' submitButton='Login' inputs={inputElements} onSubmit={handleSubmit}></InputForm>
    );
}

export default IncomeAddPage;