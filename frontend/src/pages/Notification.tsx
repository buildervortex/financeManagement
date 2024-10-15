import React, { FunctionComponent, useState, useEffect } from 'react';
import NotificationDto from '../dtos/notification/notification';
import { handleErrorResult, handleSuccessResult } from '../utils/errorMessage';
import ErrorMessage from '../viewModels/error';
import NotificationViewModel from '../viewModels/NotificationViewModel';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const Notification: FunctionComponent = () => {
  const [notifications, setNotifications] = useState<NotificationDto[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    const result: NotificationDto[] | ErrorMessage = await new NotificationViewModel().getNotifications();
    if (result instanceof ErrorMessage) {
      handleErrorResult(result);
    } else {
      setNotifications(result);
    }
  };

  const handleItemClick = (notification: NotificationDto) => {
    setExpandedId(expandedId === notification._id ? null : notification._id || null);
  };

  const markAsRead = async (id: string | undefined) => {
    if (!id) return;
    const result: NotificationDto | ErrorMessage = await new NotificationViewModel().ReadNotification(id);
    if (result instanceof ErrorMessage) {
      handleErrorResult(result);
    } else {
      handleSuccessResult('Operation Completed Successfully');
      fetchNotifications(); 
    }
  };

  const deleteNotification = async (id: string | undefined) => {
    if (!id) return;
    const result: NotificationDto | ErrorMessage = await new NotificationViewModel().DeleteNotification(id);
    if (result instanceof ErrorMessage) {
      handleErrorResult(result);
    } else {
      handleSuccessResult('Notification Deleted Successfully');
      fetchNotifications(); 
    }
  };

  const clearAllNotifications = async () => {
    // Add functionality for clearing all notifications
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return 'Date not available';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const unreadNotifications = notifications.filter((notification) => !notification.read);
  const readNotifications = notifications.filter((notification) => notification.read);

  return (
    <div className="max-w-4xl mx-auto p-8 mb-16">
      {/* Header with Enhanced Profile Button */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate('/profile')} // Navigate to profile page
          className="flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200 rounded-lg border-2 border-transparent p-2"
        >
          <div className="relative flex items-center justify-center bg-gray-200 rounded-full w-10 h-10 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <FaUserCircle size={24} className="text-gray-600" />
            {/* Optional Badge for Notifications */}
            {unreadNotifications.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                {unreadNotifications.length}
              </span>
            )}
          </div>
          <span className="ml-2">Profile</span>
        </button>
      </div>

      <div className="mt-8 w-full max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-xl font-semibold text-gray-800">Your Notifications</h2>
          <button
            onClick={clearAllNotifications}
            className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            Clear all
          </button>
        </div>

        {unreadNotifications.length > 0 ? (
          <ul className="space-y-4">
            {unreadNotifications.map((notification) => (
              <li
                key={notification._id}
                onClick={() => handleItemClick(notification)}
                className={`bg-gray-50 rounded-md p-4 hover:bg-gray-100 transition-colors duration-200 cursor-pointer border-l-4 ${notification.read ? 'border-gray-300' : 'border-blue-500'}`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className={`text-sm font-medium ${notification.read ? 'text-gray-600' : 'text-gray-800'}`}>
                      {notification.content || 'No content'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {notification.type} • {formatDate(notification.date)}
                    </p>
                  </div>
                  <span className="text-gray-400">{expandedId === notification._id ? '−' : '+'}</span>
                </div>
                {expandedId === notification._id && (
                  <div className="mt-4 text-sm text-gray-600">
                    <p>{notification.content || 'No additional content'}</p>
                    <div className="mt-4 space-x-4">
                      <button
                        onClick={(e) => { e.stopPropagation(); markAsRead(notification._id); }}
                        className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                      >
                        Mark as read
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); deleteNotification(notification._id); }}
                        className="text-red-600 hover:text-red-800 transition-colors duration-200"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600 py-8">No unread notifications at the moment.</p>
        )}
      </div>

      {/* Read Notifications Section (History) */}
      <div className="mt-12 w-full max-w-3xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">History</h2>
        {readNotifications.length > 0 ? (
          <ul className="space-y-4">
            {readNotifications.map((notification) => (
              <li
                key={notification._id}
                onClick={() => handleItemClick(notification)}
                className="bg-gray-50 rounded-md p-4 hover:bg-gray-100 transition-colors duration-200 cursor-pointer border-l-4 border-gray-300"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {notification.content || 'No content'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {notification.type} • {formatDate(notification.date)}
                    </p>
                  </div>
                  <span className="text-gray-400">{expandedId === notification._id ? '−' : '+'}</span>
                </div>
                {expandedId === notification._id && (
                  <div className="mt-4 text-sm text-gray-600">
                    <p>{notification.content || 'No additional content'}</p>
                    <div className="mt-4 space-x-4">
                      <button
                        onClick={(e) => { e.stopPropagation(); deleteNotification(notification._id); }}
                        className="text-red-600 hover:text-red-800 transition-colors duration-200"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600 py-8">No old notifications.</p>
        )}
      </div>
    </div>
  );
};

export default Notification;
