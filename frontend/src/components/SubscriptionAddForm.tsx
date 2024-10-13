import React, { FunctionComponent, useState } from 'react';
import { handleErrorResult, handleSuccessResult } from '../utils/errorMessage';
import ErrorMessage from '../viewModels/error';
import SubscriptionViewModel from '../viewModels/SubscriptionViewModel';
import AddSubscriptionDto from '../dtos/subscription/addSubscriptionDto';

interface AddSubscriptionProps { }

const SubscriptionAdd: FunctionComponent<AddSubscriptionProps> = () => {
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [initialPaymentDate, setInitialPaymentDate] = useState<Date>();
  const [installmentIntervalDays, setInstallmentIntervalDays] = useState<number>(1);
  const [totalInstallments, setTotalInstallments] = useState<number>();
  const [isRecurringIndefinitely, setIsRecurringIndefinitely] = useState<boolean>(false);
  const [remindBeforeDays, setRemindBeforeDays] = useState<number>(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const addSubscriptionDto: AddSubscriptionDto = new AddSubscriptionDto();
    addSubscriptionDto.name = name;
    addSubscriptionDto.category = category;
    addSubscriptionDto.description = description;
    addSubscriptionDto.amount = amount;
    addSubscriptionDto.initialPaymentDate = initialPaymentDate;
    addSubscriptionDto.installmentIntervalDays = installmentIntervalDays;
    addSubscriptionDto.totalInstallments = totalInstallments;
    addSubscriptionDto.isRecurringIndefinitely = isRecurringIndefinitely;
    addSubscriptionDto.remindBeforeDays = remindBeforeDays;
    
    const result = await new SubscriptionViewModel().addSusbscription(addSubscriptionDto);
    if (result instanceof ErrorMessage) {
      handleErrorResult(result);
    } else {
      handleSuccessResult('Subscription Added Successfully');
    }

    // Reset form fields
    setName("");
    setCategory("");
    setDescription("");
    setAmount(0);
    setInitialPaymentDate(undefined);
    setInstallmentIntervalDays(1);
    setTotalInstallments(undefined);
    setIsRecurringIndefinitely(false);
    setRemindBeforeDays(1);
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen">
      <div className="w-full px-3 bg-white border border-gray-200 rounded-lg shadow md:mt-0 sm:max-w-md xl:py-5">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl">
            Add Subscription Information
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Subscription Name</label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5"
                placeholder="Enter Subscription Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Category</label>
              <input
                type="text"
                name="category"
                id="category"
                className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5"
                placeholder="Enter Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
              <input
                type="text"
                name="description"
                id="description"
                className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900">Amount</label>
              <input
                type="number"
                name="amount"
                id="amount"
                className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5"
                placeholder="Enter Amount"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value))}
                required
              />
            </div>

            <div>
              <label htmlFor="initialPaymentDate" className="block mb-2 text-sm font-medium text-gray-900">Initial Payment Date</label>
              <input
                type="date"
                name="initialPaymentDate"
                id="initialPaymentDate"
                className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5"
                value={initialPaymentDate?.toISOString().split('T')[0]}
                onChange={(e) => setInitialPaymentDate(new Date(e.target.value))}
                required
              />
            </div>
            <div>
              <label htmlFor="installmentIntervalDays" className="block mb-2 text-sm font-medium text-gray-900">Installment Interval Days</label>
              <input
                type="number"
                name="installmentIntervalDays"
                id="installmentIntervalDays"
                className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5"
                placeholder="Installment Interval Days"
                value={installmentIntervalDays}
                onChange={(e) => setInstallmentIntervalDays(parseInt(e.target.value))}
                required
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="isRecurringIndefinitely"
                id="isRecurringIndefinitely"
                className="mx-3 mr-2 leading-tight"
                checked={isRecurringIndefinitely}
                onChange={(e) => setIsRecurringIndefinitely(e.target.checked)}
              />
              <label htmlFor="isRecurringIndefinitely" className="text-sm font-medium text-gray-900">Recurring Indefinitely</label>
            </div>
            {!isRecurringIndefinitely && (
              <div>
                <label htmlFor="totalInstallments" className="block mb-2 text-sm font-medium text-gray-900">Total Installments</label>
                <input
                  type="number"
                  name="totalInstallments"
                  id="totalInstallments"
                  className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5"
                  placeholder="Total Installments"
                  value={totalInstallments}
                  onChange={(e) => setTotalInstallments(parseInt(e.target.value))}
                  required={!isRecurringIndefinitely}
                />
              </div>
            )}
            <div>
              <label htmlFor="remindBeforeDays" className="block mb-2 text-sm font-medium text-gray-900">Remind Before Days</label>
              <input
                type="number"
                name="remindBeforeDays"
                id="remindBeforeDays"
                className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5"
                placeholder="Remind Before Days"
                value={remindBeforeDays}
                onChange={(e) => setRemindBeforeDays(parseInt(e.target.value))}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-[#FF8343] bg-primary-600 hover:bg-[#fd8b53] focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-3 text-center"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionAdd;