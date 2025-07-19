import React, { useState, useCallback } from 'react';
import { flowchartData } from './constants/flowchartData';
import { FlowchartNode, NodeType } from './types';
import DecisionNode from './components/DecisionNode';
import ResultNode from './components/ResultNode';

const App: React.FC = () => {
  const [currentNodeId, setCurrentNodeId] = useState<string>('START');

  const handleChoice = useCallback((nextId: string) => {
    if (flowchartData[nextId]) {
      setCurrentNodeId(nextId);
    } else {
      console.error(`Node with id ${nextId} not found!`);
      // Fallback to start
      setCurrentNodeId('START');
    }
  }, []);

  const handleRestart = useCallback(() => {
    setCurrentNodeId('START');
  }, []);

  const currentNode: FlowchartNode = flowchartData[currentNodeId];

  const renderNode = () => {
    if (!currentNode) {
      return (
        <div className="text-center text-red-500">
          <p>エラー: フローチャートのノードが見つかりません。</p>
          <button onClick={handleRestart} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">最初からやり直す</button>
        </div>
      );
    }

    switch (currentNode.type) {
      case NodeType.DECISION:
        return <DecisionNode node={currentNode} onChoice={handleChoice} />;
      case NodeType.OUTCOME:
        return <ResultNode node={currentNode} onRestart={handleRestart} />;
      default:
         return (
            <div className="text-center text-red-500">
              <p>エラー: 不明なノードタイプです。</p>
              <button onClick={handleRestart} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">最初からやり直す</button>
            </div>
         );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 font-sans">
        <header className="w-full max-w-2xl mx-auto text-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800">IVUSカテーテルスタック</h1>
            <p className="text-slate-600 mt-1">ベイルアウト・フローアプリケーション</p>
        </header>
        <main className="w-full max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg transition-all duration-300 ease-in-out">
                {renderNode()}
            </div>
        </main>
        <footer className="w-full max-w-2xl mx-auto text-center mt-8">
            <p className="text-xs text-slate-400">
              Clinical expert consensus document on bailout algorithms for complications in<br />
              percutaneous coronary intervention from the Japanese Association of<br />
              Cardiovascular Intervention and Therapeutics
            </p>
        </footer>
    </div>
  );
};

export default App;