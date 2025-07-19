import React from 'react';
import { FlowchartNode, OutcomeStyle } from '../types';

interface ResultNodeProps {
  node: FlowchartNode;
  onRestart: () => void;
}

const SuccessIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const FailureIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
);

const ResultNode: React.FC<ResultNodeProps> = ({ node, onRestart }) => {
  const isSuccess = node.outcomeStyle === OutcomeStyle.SUCCESS;
  const bgColor = isSuccess ? 'bg-blue-600' : 'bg-red-600';
  const buttonColor = isSuccess ? 'bg-blue-700 hover:bg-blue-800' : 'bg-red-700 hover:bg-red-800';

  return (
    <div className={`p-8 md:p-12 text-center text-white rounded-xl ${bgColor}`}>
      <div className="flex justify-center mb-6">
        {isSuccess ? <SuccessIcon /> : <FailureIcon />}
      </div>
      <h2 className="text-3xl md:text-4xl font-extrabold">{node.title}</h2>
      <p className="mt-3 text-lg opacity-90">{node.description}</p>
      <button
        onClick={onRestart}
        className={`mt-10 px-8 py-3 rounded-lg font-semibold transition-colors duration-200 ${buttonColor}`}
      >
        最初からやり直す
      </button>
    </div>
  );
};

export default ResultNode;
