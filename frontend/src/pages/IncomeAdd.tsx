import { FunctionComponent, useState,useEffect } from 'react';
import InputForm from '../components/inputForm';
import IncomeList from '../components/IncomeList';
import IncomeViewModel from '../viewModels/IncomeViewModel';
import { handleErrorResult } from '../utils/errorMessage';
import ErrorMessage from '../viewModels/error';
import addIncomeDto from '../dtos/income/addIncomeDto';
import IncomeDto from '../dtos/income/incomeDto';

interface AddIncomePageProps { }

interface InputElement {
  labelContent: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  name: string;
  id: string;
  className: string;
  placeholder: string;
}

const IncomeAddPage: FunctionComponent<AddIncomePageProps> = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [monthly, setMonthly] = useState<boolean>(false);
  const [incomeDate, setIncomeDate] = useState<number>();
  const [currencyType, setCurrencyType] = useState<string>("");
  const [incomes, setIncomes] = useState<IncomeDto[]>([]);

  useEffect(() => {
    const fetchIncomes = async () => {
      const result: IncomeDto[] | ErrorMessage = await new IncomeViewModel().getIncomes();
      if (result instanceof ErrorMessage) {
        handleErrorResult(result);
      } else {
        setIncomes(result); 
      }
    };
    fetchIncomes();
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const addincomeDto: addIncomeDto = new addIncomeDto();
    addincomeDto.name = name;
    addincomeDto.description = description;
    addincomeDto.amount = amount;
    addincomeDto.monthly = monthly;
    addincomeDto.monthlyDate = incomeDate;
    addincomeDto.currencyType = currencyType;
    const result = await new IncomeViewModel().addIncome(addincomeDto)
    if (result instanceof ErrorMessage) {
      handleErrorResult(result);
  } 

    setName("");
    setDescription("");
    setAmount(0);
    setMonthly(false);
    setCurrencyType("");

  };

  // Input elements configuration
  const inputElements: InputElement[] = [
    {
      labelContent: 'Income',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value),
      type: "text",
      name: "name",
      id: "name",
      className: "bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5",
      placeholder: "Enter Your Income"
    },
    {
      labelContent: 'Description',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value),
      type: "text",
      name: "description",
      id: "description",
      className: "bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5",
      placeholder: "Enter Description"
    },
    {
      labelContent: 'Amount',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setAmount(parseFloat(e.target.value)),
      type: "number",
      name: "amount",
      id: "amount",
      className: "bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5",
      placeholder: "Enter Amount"
    },
    {
      labelContent: 'Monthly',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setMonthly(e.target.checked),
      type: "checkbox",
      name: "monthly",
      id: "monthly",
      className: "mx-3 mr-2 leading-tight",
      placeholder: ""
    },
    ...(monthly ? [
      {
        labelContent: 'Income Date',
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => setIncomeDate(parseInt(e.target.value)),
        type: "number",
        name: "incomeDate",
        id: "incomeDate",
        className: "bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5",
        placeholder: "Enter Income date"
      }
    ] : []),
    {
      labelContent: 'Currency Type',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setCurrencyType(e.target.value),
      type: "text",
      name: "currencyType",
      id: "currencyType",
      className: "bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5",
      placeholder: "Enter Currency Type"
    }
  ];

  return (
    <>
      <InputForm
        formName='Add Income Information'
        submitButton='Submit'
        inputs={inputElements}
        onSubmit={handleSubmit}
      />

<div className="my-4">
        <IncomeList incomeList={incomes} /> 
      </div>
    </>
  );
};

export default IncomeAddPage;
