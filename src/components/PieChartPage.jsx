import { Link } from 'react-router-dom';
import Charts from './Charts';
import { spendingByCategory, colors } from '../data/financialData';

export default function PieChartPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-[2000px] mx-auto">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors font-medium">
            <span>&larr;</span> Back to Dashboard
          </Link>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Spending Distribution
          </h1>
          
          {/* HUGE Pie Chart */}
          <div className="h-[900px] mb-12 flex items-center justify-center">
            <Charts chartType="pieOnly" />
          </div>
          
          {/* Category Legend - Horizontal Layout */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 text-center">Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {spendingByCategory.map((item, idx) => (
                <div key={idx} className="group p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white hover:from-purple-50 hover:to-blue-50 transition-all duration-300 border-2 border-gray-100 hover:border-purple-300 hover:shadow-xl transform hover:-translate-y-2 flex flex-col items-center text-center">
                  <div 
                    className="w-16 h-16 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300 mb-4" 
                    style={{ backgroundColor: colors[idx % colors.length] }}
                  ></div>
                  <span className="text-lg font-bold text-gray-900 mb-2">{item.name}</span>
                  <span className="text-sm text-gray-500 mb-3">{((item.value / spendingByCategory.reduce((sum, cat) => sum + cat.value, 0)) * 100).toFixed(1)}%</span>
                  <span className="text-2xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    ${item.value.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="mt-12 flex justify-center">
              <div className="w-full max-w-5xl p-10 md:p-12 rounded-3xl bg-gradient-to-r from-purple-100 to-blue-100 border border-purple-200/60 shadow-lg flex flex-col md:flex-row items-center justify-between gap-5 md:gap-10">
                <span className="text-3xl font-bold text-gray-800">Total Spending</span>
                <span className="text-5xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  ${spendingByCategory.reduce((sum, cat) => sum + cat.value, 0).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
