import React from 'react';
import { ActionItem, BulletColor } from '../types';

interface ActionListItemProps {
  action: ActionItem;
  onShowImage?: (src: string) => void;
}

const ActionListItem: React.FC<ActionListItemProps> = ({ action, onShowImage }) => {
  if (action.isHeader) {
    return (
      <li className="pt-4 first:pt-2">
        <h4 className="font-semibold text-slate-600 text-sm md:text-base underline underline-offset-2">{action.actionText}</h4>
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

  let bulletColorClass = 'bg-slate-400';
  let textColorClass = 'text-slate-700';

  if (action.color) {
    switch (action.color) {
      case BulletColor.GREEN:
        bulletColorClass = 'bg-green-500';
        textColorClass = 'text-green-700';
        break;
      case BulletColor.ORANGE:
        bulletColorClass = 'bg-orange-500';
        textColorClass = 'text-orange-700';
        break;
      case BulletColor.RED:
        bulletColorClass = 'bg-red-500';
        textColorClass = 'text-red-700';
        break;
    }
  }

  return (
    <li className="flex justify-between items-start py-3 border-b border-slate-100 last:border-b-0">
      {/* Left Column */}
      <div className="w-5/12 pr-2">
        <span className="text-sm md:text-base text-slate-800">{action.actionText}</span>
      </div>

      {/* Right Column */}
      <div className="w-7/12 flex items-start">
        {action.cautionText && (
          <>
            <div className={`flex-shrink-0 w-2.5 h-2.5 rounded-full mr-2.5 mt-1.5 ${bulletColorClass}`}></div>
            <span className={`flex-grow text-sm md:text-base font-medium ${textColorClass}`}>{action.cautionText}</span>
          </>
        )}
      </div>

      {action.image && onShowImage && (
        <button
          onClick={() => onShowImage(action.image!)}
          className="ml-4 flex-shrink-0 px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
          aria-label={`画像を表示: ${action.actionText}`}
        >
          表示
        </button>
      )}
    </li>
  );
};

export default ActionListItem;
