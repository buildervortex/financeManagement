import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { useLocation } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import GoalDto from '../dtos/goal/goalDto';
import IncomeDto from '../dtos/income/incomeDto';
import SubscriptionDto from '../dtos/subscription/subscriptionDto';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface FinancialCalendarProps {
  goals: GoalDto[];
  incomes: IncomeDto[];
  subscriptions: SubscriptionDto[];
  onAskAi: () => void;
  savingMessage: string;
}

type EventType = 'goal' | 'income' | 'subscription';
type HighlightedDates = Map<string, EventType[]>;

interface TileArgs {
  date: Date;
  view: string;
}

const FinancialCalendar: React.FC<FinancialCalendarProps> = ({ 
  goals, 
  incomes, 
  subscriptions, 
  onAskAi, 
  savingMessage
}) => {
  const location = useLocation();
  const [highlightedDates, setHighlightedDates] = useState<HighlightedDates>(new Map());
  const today = new Date();

  useEffect(() => {
    const newHighlightedDates = new Map<string, EventType[]>();

    // Function to add date with type to highlighted dates
    const addHighlightDate = (date: Date, type: EventType): void => {
      if (date >= today) {
        const dateStr = date.toISOString().split('T')[0];
        const existing = newHighlightedDates.get(dateStr) || [];
        newHighlightedDates.set(dateStr, [...existing, type]);
      }
    };

    // Add goal deadlines
    goals.forEach(goal => {
      if (goal.deadline) {
        addHighlightDate(new Date(goal.deadline), 'goal');
      }
    });

    // Add monthly income dates
    incomes.forEach(income => {
      if (income.monthly && income.monthlyDate) {
        // Add income dates for next 3 months
        for (let i = 0; i < 3; i++) {
          const date = new Date(
            today.getFullYear(),
            today.getMonth() + i,
            income.monthlyDate
          );
          if (date >= today) {
            addHighlightDate(date, 'income');
          }
        }
      }
    });

    // Add subscription dates
    subscriptions.forEach(sub => {
      if (sub.nextInstallmentDate) {
        addHighlightDate(new Date(sub.nextInstallmentDate), 'subscription');
      }
    });

    setHighlightedDates(newHighlightedDates);
  }, [goals, incomes, subscriptions]);

  const getTileClassName = ({ date }: TileArgs): string => {
    const dateStr = date.toISOString().split('T')[0];
    const types = highlightedDates.get(dateStr);
    
    if (!types) return '';
    
    const classes: string[] = [];
    
    if (types.includes('goal')) {
      classes.push('bg-purple-200');
    }
    if (types.includes('income')) {
      classes.push('bg-green-200');
    }
    if (types.includes('subscription')) {
      classes.push('bg-blue-200');
    }
    
    return classes.join(' ');
  };

  const getTileContent = ({ date }: TileArgs): JSX.Element | null => {
    const dateStr = date.toISOString().split('T')[0];
    const types = highlightedDates.get(dateStr);
    if (!types) return null;

    return (
      <div className="flex flex-wrap gap-0.5 mt-1">
        {types.map((type, index) => (
          <div
            key={index}
            className={`w-1.5 h-1.5 rounded-full ${
              type === 'goal'
                ? 'bg-purple-500'
                : type === 'income'
                ? 'bg-green-500'
                : 'bg-blue-500'
            }`}
          />
        ))}
      </div>
    );
  };

  if (!location.pathname.includes('dashboard')) {
    return null;
  }

  return (
    <div className="fixed bottom-28 right-14 z-50">
      <div className="bg-white rounded-lg shadow-xl p-4">
        <Calendar
          className="border-0 shadow-none text-sm"
          tileClassName={getTileClassName}
          minDate={today}
          maxDate={new Date(today.getFullYear(), today.getMonth() + 3, 0)}
          tileContent={getTileContent}
          value={today}
        />
        <div className="mt-2 flex flex-col gap-3 text-xs">
          <div className='flex flex-row gap-1'>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-purple-500" />
            <span>Goals</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span>Income</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span>Subscriptions</span>
          </div></div>
          
          <p className="font-semibold text-lg">{savingMessage}</p>
            <button
              onClick={onAskAi}
              className="w-full bg-gray-600 text-white rounded-md p-2 transition hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              AI Suggestions
            </button>
        </div>

      </div>
    </div>
  );
};

export default FinancialCalendar;