import React, { useState } from 'react';
import { FlowchartNode, Choice, ChoiceStyle } from '../types';
import ActionListItem from './ActionListItem';
import ImageModal from './ImageModal';

interface DecisionNodeProps {
  node: FlowchartNode;
  onChoice: (nextId: string) => void;
}

const getChoiceClasses = (style: ChoiceStyle): string => {
  const baseClasses = "w-full text-left p-4 rounded-lg transition-colors duration-200 ease-in-out flex items-center justify-between text-sm sm:text-base font-semibold";
  switch (style) {
    case ChoiceStyle.PRIMARY:
      return `${baseClasses} bg-blue-500 text-white hover:bg-blue-600`;
    case ChoiceStyle.SECONDARY:
      return `${baseClasses} bg-slate-200 text-slate-800 hover:bg-slate-300`;
    case ChoiceStyle.DANGER:
      return `${baseClasses} bg-red-500 text-white hover:bg-red-600`;
    default:
      return `${baseClasses} bg-gray-500 text-white hover:bg-gray-600`;
  }
};

const ArrowIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-3" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);


const DecisionNode: React.FC<DecisionNodeProps> = ({ node, onChoice }) => {
  const [modalImageSrc, setModalImageSrc] = useState<string | null>(null);

  const handleShowImage = (src: string) => {
    setModalImageSrc(src);
  };

  const handleCloseModal = () => {
    setModalImageSrc(null);
  };
  
  return (
    <>
      <div className="p-6 md:p-8">
        <div className="border-b border-slate-200 pb-4 mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-slate-800">{node.title}</h2>
          {node.description && <p className="mt-2 text-slate-600 text-sm md:text-base">{node.description}</p>}
        </div>

        {node.actions && node.actions.length > 0 && (
          <div className="mb-6">
            <ul className="space-y-3">
              {node.actions.map((action, index) => (
                <ActionListItem key={index} action={action} onShowImage={handleShowImage} />
              ))}
            </ul>
          </div>
        )}

        {node.question && (
          <div className="my-6 p-4 bg-slate-100 rounded-lg flex items-center justify-center text-center">
            <p className="text-lg font-semibold text-slate-700">
              {node.question}
            </p>
            {node.questionImage && (
              <button 
                onClick={() => handleShowImage(node.questionImage!)}
                className="ml-4 px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
              >
                表示
              </button>
            )}
          </div>
        )}

        {node.choices && node.choices.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">選択してください</h3>
            <div className="space-y-3">
              {node.choices.map((choice: Choice) => (
                <button
                  key={choice.nextId}
                  onClick={() => onChoice(choice.nextId)}
                  className={getChoiceClasses(choice.style)}
                >
                  <span>{choice.text}</span>
                  <ArrowIcon />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      {modalImageSrc && (
        <ImageModal src={modalImageSrc} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default DecisionNode;