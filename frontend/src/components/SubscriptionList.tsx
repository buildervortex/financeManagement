import { FunctionComponent } from 'react';
import SubscriptionDto from '../dtos/subscription/subscriptionDto';
import { useNavigate } from 'react-router-dom';

interface SubscriptionListProps {
  formName?: string;
  description?: string;
  SubscriptionList: SubscriptionDto[];
}

const SubscriptionList: FunctionComponent<SubscriptionListProps> = ({ formName, description, SubscriptionList }) => {

  const navigate = useNavigate();

  const handleItemClick = (subscription: SubscriptionDto) => {
    navigate('/Subscription-details', { state: { subscription } });
  };

  return (
    <div className="w-full max-w-xl p-4 mx-auto mt-8 bg-white rounded-lg shadow-md">
      <h2 className="pb-2 mb-4 text-xl font-semibold text-black border-b">{formName}</h2>
      {SubscriptionList.length > 0 ? (
        <ul className="space-y-4">
          {SubscriptionList.map((subscription, index) => (
            <li
              key={index}
              onClick={() => handleItemClick(subscription)}
              className="p-3 transition-colors duration-200 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700">{subscription.name}</p>
                </div>
                <p className="text-lg font-bold text-orange-500">
                  {subscription.currencyType} {subscription.amount?.toFixed(2)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="py-6 text-center text-gray-500">{description}</p>
      )}
    </div>
  );
};

export default SubscriptionList;
