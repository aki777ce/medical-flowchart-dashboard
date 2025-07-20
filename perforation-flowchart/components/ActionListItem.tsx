import React from 'react';
import { Action, BulletColor } from '../types';

interface ActionListItemProps {
  action: Action;
  isInResultNode?: boolean;
}

const CheckCircleIcon: React.FC = () => (
    <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
);

const WarningIcon: React.FC = () => (
    <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.21 3.03-1.742 3.03H4.42c-1.532 0-2.492-1.696-1.742-3.03l5.58-9.92zM10 13a1 1 0 110-2 1 1 0 010 2zm-1-4a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
);

const XCircleIcon: React.FC = () => (
    <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path></svg>
);

const ActionListItem: React.FC<ActionListItemProps> = ({ action, isInResultNode = false }) => {
  let icon: React.ReactNode;
  let textClass = isInResultNode ? 'text-white' : 'text-slate-800';
  let containerClass = isInResultNode ? 'bg-white bg-opacity-10' : 'bg-white border-slate-200';

  switch (action.color) {
    case BulletColor.GREEN:
      icon = <CheckCircleIcon />;
      textClass = isInResultNode ? 'text-white font-medium' : 'text-slate-800 font-medium';
      if (!isInResultNode) {
        containerClass = 'bg-green-50 border-green-200';
      }
      break;
    case BulletColor.ORANGE:
      icon = <WarningIcon />;
      textClass = isInResultNode ? 'text-white font-medium' : 'text-slate-800 font-medium';
      if (!isInResultNode) {
        containerClass = 'bg-yellow-50 border-yellow-200';
      }
      break;
    case BulletColor.RED:
      icon = <XCircleIcon />;
      textClass = isInResultNode ? 'text-white font-medium' : 'text-slate-800 font-medium';
      if (!isInResultNode) {
        containerClass = 'bg-red-50 border-red-200';
      }
      break;
    default:
      icon = <CheckCircleIcon />;
      break;
  }

  return (
    <li className={`flex items-start space-x-3 p-3 rounded-lg border ${containerClass}`}>
      <div className="flex-shrink-0 mt-0.5">
        {icon}
      </div>
      <div className="flex-1">
        <p className={`text-sm md:text-base ${textClass}`}>
          {action.text}
        </p>
      </div>
    </li>
  );
};

export default ActionListItem;
