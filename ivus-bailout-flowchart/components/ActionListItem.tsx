import React from 'react';
import { ActionItem, BulletColor } from '../types';

interface ActionListItemProps {
  action: ActionItem;
  onShowImage?: (src: string) => void;
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

const ActionListItem: React.FC<ActionListItemProps> = ({ action, onShowImage }) => {
  if (action.isHeader) {
    return (
      <li className="pt-4 first:pt-2">
        <h4 className="font-semibold text-slate-600 text-sm md:text-base underline underline-offset-2">{action.text}</h4>
        {action.subItems && action.subItems.length > 0 && (
          <ul className="mt-2 space-y-3 pl-2">
            {action.subItems.map((subItem, index) => (
              <ActionListItem key={index} action={subItem} onShowImage={onShowImage} />
            ))}
          </ul>
        )}
      </li>
    );
  }

  let icon: React.ReactNode;
  let textClass = 'text-slate-800';
  let description: string = '';
  let containerClass = 'bg-white border-slate-200';

  if (action.color) {
    switch (action.color) {
      case BulletColor.GREEN:
        icon = <CheckCircleIcon />;
        textClass = 'text-slate-800 font-medium';
        description = '推奨される処置';
        containerClass = 'bg-green-50 border-green-200';
        break;
      case BulletColor.ORANGE:
        icon = <WarningIcon />;
        description = '注意を要する処置 (複雑・合併症リスク)';
        containerClass = 'bg-yellow-50 border-yellow-200';
        break;
      case BulletColor.RED:
        icon = <XCircleIcon />;
        textClass = 'text-slate-500 line-through';
        description = '禁忌 (行ってはいけない処置)';
        containerClass = 'bg-red-50 border-red-200';
        break;
    }
  } else {
    // Fallback for items without a color, though current data doesn't use this.
    icon = <div className="w-2.5 h-2.5 rounded-full bg-slate-400 mt-1.5 ml-0.5"></div>;
  }

  return (
    <li>
      <div className={`flex items-center p-3 rounded-lg border ${containerClass}`}>
        <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center mr-3" role="img" aria-label={description || 'list item'}>
          {icon}
        </div>
        <div className="flex-grow">
          <span className={`text-sm md:text-base ${textClass}`}>{action.text}</span>
          {description && <p className="text-xs text-slate-500 mt-0.5">{description}</p>}
        </div>
        {action.image && onShowImage && (
            <button
              onClick={() => onShowImage(action.image!)}
              className="ml-4 flex-shrink-0 px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
              aria-label={`画像を表示: ${action.text}`}
            >
              表示
            </button>
        )}
      </div>
    </li>
  );
};

export default ActionListItem;
