import { Link } from 'react-router-dom';
import Charts from './Charts';
import { spendingByCategory, colors } from '../data/financialData';

export default function PieChartPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link to="/" className="text-blue-600 hover:text-blue-800 transition-colors">
            &larr; Back to Dashboard
          </Link>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Spending Distribution</h1>
          <div className="h-96 mb-8">
            <Charts chartType="pieOnly" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-4">
            {spendingByCategory.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-4 h-4" style={{ backgroundColor: colors[idx % colors.length] }}></div>
                <span className="text-sm text-gray-700">{item.name}</span>
                <span className="text-sm font-semibold text-gray-900 ml-auto">${item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
