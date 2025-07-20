import React from 'react';
import { FlowchartNode } from '../types';
import ActionListItem from './ActionListItem';
import BailoutTable from './BailoutTable';

interface ResultNodeProps {
  node: FlowchartNode;
  onRestart: () => void;
  onNext?: (nodeId: string) => void;
}

const SuccessIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const WarningIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
);

const MedicalIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
);

const getResultStyle = (nodeId: string) => {
  if (nodeId.includes('SURGICAL') || nodeId.includes('EMERGENCY')) {
    return {
      bgColor: 'bg-red-600',
      buttonColor: 'bg-red-700 hover:bg-red-800',
      icon: <WarningIcon />
    };
  } else if (nodeId.includes('SUCCESS') || nodeId.includes('OBSERVATION')) {
    return {
      bgColor: 'bg-green-600',
      buttonColor: 'bg-green-700 hover:bg-green-800',
      icon: <SuccessIcon />
    };
  } else {
    return {
      bgColor: 'bg-blue-600',
      buttonColor: 'bg-blue-700 hover:bg-blue-800',
      icon: <MedicalIcon />
    };
  }
};

const ResultNode: React.FC<ResultNodeProps> = ({ node, onRestart, onNext }) => {
  const { bgColor, buttonColor, icon } = getResultStyle(node.id);

  // Special handling for COIL_TREATMENT node to show table format
  if (node.id === 'COIL_TREATMENT') {
    return (
      <div className="p-6 md:p-8">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            {icon}
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800">{node.title}</h2>
          <p className="mt-2 text-slate-600">{node.description}</p>
        </div>
        
        <div className="mb-8">
          <BailoutTable />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {node.nextNodeId && node.nextButtonText && onNext && (
            <button
              onClick={() => onNext(node.nextNodeId!)}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-200 ${buttonColor} text-white`}
            >
              {node.nextButtonText}
            </button>
          )}
          
          <button
            onClick={onRestart}
            className="px-6 py-3 rounded-lg font-semibold transition-colors duration-200 bg-slate-600 hover:bg-slate-700 text-white"
          >
            最初からやり直す
          </button>
        </div>
      </div>
    );
  }

  // Default rendering for other nodes
  return (
    <div className={`p-8 md:p-12 text-center text-white rounded-xl ${bgColor}`}>
      <div className="flex justify-center mb-6">
        {icon}
      </div>
      <h2 className="text-3xl md:text-4xl font-extrabold">{node.title}</h2>
      <p className="mt-3 text-lg opacity-90">{node.description}</p>
      
      {node.actions && node.actions.length > 0 && (
        <div className="mt-6 text-left bg-white bg-opacity-10 rounded-lg p-4">
          <h3 className="text-xl font-semibold mb-3 text-center">実施事項</h3>
          <ul className="space-y-2">
            {node.actions.map((action, index) => (
              <ActionListItem key={index} action={action} isInResultNode={true} />
            ))}
          </ul>
        </div>
      )}
      
      <div className="mt-10 space-y-4">
        {node.nextNodeId && node.nextButtonText && onNext && (
          <button
            onClick={() => onNext(node.nextNodeId!)}
            className={`w-full px-8 py-3 rounded-lg font-semibold transition-colors duration-200 ${buttonColor}`}
          >
            {node.nextButtonText}
          </button>
        )}
        
        <button
          onClick={onRestart}
          className={`px-8 py-3 rounded-lg font-semibold transition-colors duration-200 bg-slate-600 hover:bg-slate-700 text-white`}
        >
          最初からやり直す
        </button>
      </div>
    </div>
  );
};

export default ResultNode;
