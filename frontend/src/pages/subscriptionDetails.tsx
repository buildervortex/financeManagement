import React, { useState } from 'react';
import { FunctionComponent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ErrorMessage from '../viewModels/error';
import { handleErrorResult } from '../utils/errorMessage';
import SubscriptionViewModel from '../viewModels/SubscriptionViewModel';
import SubscriptionDto from '../dtos/subscription/subscriptionDto';

interface LocationState {
  subscription: SubscriptionDto;
}

const SusbcriptionDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { subscription } = location.state as LocationState || {};
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US').format(new Date(date));
  };

  const handleUpdateClick = () => {
    navigate('/updateSubscription', { state: { subscription } });
  };

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const deleteSubscription = async () => {
    const subscriptionId = subscription.id ?? '';
    const result: SubscriptionDto | ErrorMessage = await new SubscriptionViewModel().DeleteSubscription(subscriptionId);
    if (result instanceof ErrorMessage) {
      handleErrorResult(result);
    } else {
      navigate('/addSubscription');
    }
    closeModal();
  };

  return (
    <div className="w-full max-w-2xl p-8 m-10 mx-auto mt-10 rounded-lg shadow-xl bg-gray-50">
      <h1 className="px-4 mb-3 text-2xl text-center text-gray-900">SUBSCRIPTION DETAILS</h1>
      <div className="p-4">
        <div className="mb-4">
          <p className="text-lg font-medium text-gray-900">Subscription Name:</p>
          <p className="text-xl text-gray-600">{subscription.name}</p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-medium text-gray-900">Category:</p>
          <p className="text-lg text-gray-600">{subscription.category}</p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-medium text-gray-900">Description:</p>
          <p className="text-lg text-gray-600">{subscription.description}</p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-medium text-gray-900">Amount:</p>
          <p className="text-xl text-gray-600">{subscription.currencyType} {(subscription.amount ?? 0).toFixed(2)}</p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-medium text-gray-900">Installment Interval (Days):</p>
          <p className="text-xl text-gray-600">{subscription.installmentIntervalDays}</p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-medium text-gray-900">Total Installments:</p>
          <p className="text-lg text-gray-600">{subscription.totalInstallments}</p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-medium text-gray-900">Recurring Indefinitely:</p>
          <p className={`text-xl ${subscription.isRecurringIndefinitely ? 'text-green-600' : 'text-red-600'}`}>
            {subscription.isRecurringIndefinitely ? "Yes" : "No"}
          </p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-medium text-gray-900">Remind Before (Days):</p>
          <p className="text-xl text-gray-600">{subscription.remindBeforeDays}</p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-medium text-gray-900">Initial Payment Date:</p>
          <p className="text-xl text-gray-600">{formatDate(subscription.initialPaymentDate ?? new Date)}</p>
        </div>
        <div className="items-center mt-6">
          <div className='flex items-center gap-x-4'>
            <button 
              onClick={handleUpdateClick} 
              className="my-2 px-4 py-2 border border-[#FF8343] bg-[#FF8343] text-white rounded-md hover:bg-[#fd8b53]"
            >
              Update Subscription
            </button><br/>
            <button 
              onClick={handleDeleteClick} 
              className="px-5 py-2 border border-[#FF8343] text-[#FF8343] rounded-md hover:bg-gray-300">
              Delete Subscription
            </button>
          </div>
        </div>
      </div>
      
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900 bg-opacity-50" onClick={closeModal}>
          <div 
            className="relative w-full max-w-sm p-6 bg-white rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()} // Prevent click event from closing the modal
          >
            <h2 className="mb-4 text-xl font-semibold text-gray-800">Confirm Delete</h2>
            <p className="mb-4 text-gray-600">Are you sure you want to delete this subscription entry?</p>
            <div className="flex justify-end space-x-4">
              <button 
                onClick={closeModal} 
                className="px-4 py-2 text-gray-800 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button 
                onClick={deleteSubscription} 
                className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SusbcriptionDetails;