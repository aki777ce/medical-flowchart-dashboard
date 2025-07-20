import React from 'react';

interface BailoutMethod {
  name: string;
  preparation: string[];
  technique: string[];
  heparinReverse: string;
  colorClass: string;
}

const bailoutMethods: BailoutMethod[] = [
  {
    name: 'コイル',
    preparation: ['製品準備'],
    technique: [
      'コイルを穿孔部近傍に留置できれば、少ない数のコイルで止血が可能',
      '短時間・確実・再現性の高い手技が可能'
    ],
    heparinReverse: '不要',
    colorClass: 'bg-green-50 border-l-4 border-green-500'
  },
  {
    name: '血栓',
    preparation: [
      'ヘパリン化前血栓',
      '薬剤で作成した血栓'
    ],
    technique: [
      '手技中に塞栓子が逆行できないため手技の再現性が低い',
      '血栓溶解による再出血の可能性が否定できない'
    ],
    heparinReverse: '適宜',
    colorClass: 'bg-orange-50 border-l-4 border-orange-500'
  },
  {
    name: '脂肪',
    preparation: ['脂肪採取'],
    technique: ['手技中に塞栓子が逆行できないため手技の再現性が低い'],
    heparinReverse: '適宜',
    colorClass: 'bg-orange-50 border-l-4 border-orange-500'
  },
  {
    name: 'スポンゼル',
    preparation: ['製品準備'],
    technique: ['手技中に塞栓子が逆行できないため手技の再現性が低い'],
    heparinReverse: '適宜',
    colorClass: 'bg-red-50 border-l-4 border-red-500'
  }
];

const BailoutTable: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-slate-700 text-white p-4">
        <h3 className="text-xl font-bold text-center">ベイルアウト手法</h3>
      </div>
      
      {/* Desktop Table View */}
      <div className="hidden md:block">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-slate-700 border-b">手技</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700 border-b">準備</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700 border-b">手技特徴</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700 border-b">ヘパリンリバース</th>
            </tr>
          </thead>
          <tbody>
            {bailoutMethods.map((method, index) => (
              <tr key={index} className={`${method.colorClass} hover:bg-opacity-80 transition-colors`}>
                <td className="px-4 py-4 font-semibold text-slate-800">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2 ${
                      method.name === 'コイル' ? 'bg-green-500' : 'bg-orange-500'
                    }`}></div>
                    {method.name}
                  </div>
                </td>
                <td className="px-4 py-4 text-slate-700">
                  <div className="space-y-1">
                    {method.preparation.map((line, idx) => (
                      <div key={idx}>{line}</div>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-4 text-slate-700 text-sm leading-relaxed">
                  <div className="space-y-1">
                    {method.technique.map((line, idx) => (
                      <div key={idx}>{line}</div>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-4 text-slate-700 font-medium">
                  <span className={`px-2 py-1 rounded text-sm ${
                    method.heparinReverse === '不要' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-orange-100 text-orange-800'
                  }`}>
                    {method.heparinReverse}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3 p-4">
        {bailoutMethods.map((method, index) => {
          const isCoil = method.name === 'コイル';
          const isSponzel = method.name === 'スポンゼル';
          const iconColor = isCoil ? 'bg-green-500' : isSponzel ? 'bg-red-500' : 'bg-orange-500';
          const cardBorder = isCoil ? 'border-l-4 border-green-500' : isSponzel ? 'border-l-4 border-red-500' : 'border-l-4 border-orange-500';
          
          return (
            <div key={index} className={`bg-white rounded-lg shadow-md overflow-hidden ${cardBorder}`}>
              {/* Header Section */}
              <div className={`p-4 ${
                isCoil ? 'bg-green-50' : isSponzel ? 'bg-red-50' : 'bg-orange-50'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full mr-3 ${iconColor}`}></div>
                    <h3 className="text-xl font-bold text-slate-800">{method.name}</h3>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    method.heparinReverse === '不要' 
                      ? 'bg-green-100 text-green-800 border border-green-200' 
                      : 'bg-orange-100 text-orange-800 border border-orange-200'
                  }`}>
                    ヘパリンリバース: {method.heparinReverse}
                  </span>
                </div>
              </div>
              
              {/* Content Section */}
              <div className="p-4 space-y-3">
                <div className="bg-slate-50 rounded-lg p-3">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-slate-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <div>
                      <span className="text-sm font-semibold text-slate-600 block mb-1">準備</span>
                      <div className="space-y-1">
                        {method.preparation.map((line, idx) => (
                          <div key={idx} className="text-slate-700">{line}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-50 rounded-lg p-3">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-slate-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <div>
                      <span className="text-sm font-semibold text-slate-600 block mb-1">手技特徴</span>
                      <div className="space-y-1">
                        {method.technique.map((line, idx) => (
                          <div key={idx} className="text-slate-700 leading-relaxed">{line}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BailoutTable;
