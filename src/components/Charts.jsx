import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { colors } from '../data/financialData';
import "tailwindcss";

const balanceOverTime = [
  { month: 'Jan', balance: 8000 },
  { month: 'Feb', balance: 9200 },
  { month: 'Mar', balance: 8800 },
  { month: 'Apr', balance: 10500 },
  { month: 'May', balance: 11200 },
  { month: 'Jun', balance: 12800 },
];

const spendingByCategory = [
  { name: 'Groceries', value: 1200 },
  { name: 'Entertainment', value: 800 },
  { name: 'Utilities', value: 450 },
  { name: 'Transportation', value: 600 },
  { name: 'Healthcare', value: 350 },
];

export default function Charts({ chartType = 'both' }) {
  if (chartType === 'lineOnly') {
    return (
      <div className="group relative h-full">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300/30 to-purple-300/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
        <div className="relative bg-white backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-xl p-4 border border-gray-200 hover:border-blue-300 transition-all duration-500">
          <div className="flex flex-col gap-1 mb-3">
            <h2 className="text-lg font-bold text-blue-700">Overview</h2>
            <p className="text-xs text-gray-500">Balance trend</p>
          </div>
          <div className="bg-blue-50/50 rounded-lg p-2 border border-blue-100">
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={balanceOverTime} isAnimationActive={true}>
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#dbeafe" opacity={0.3} />
                <XAxis dataKey="month" stroke="#9ca3af" style={{ fontSize: '10px' }} />
                <YAxis stroke="#9ca3af" style={{ fontSize: '10px' }} width={35} />
                <Tooltip
                  formatter={(value) => `$${value.toLocaleString()}`}
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #3b82f6',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    padding: '6px 10px',
                    fontSize: '11px'
                  }}
                />
                <Line
                  type="natural"
                  dataKey="balance"
                  stroke="#60a5fa"
                  strokeWidth={2}
                  dot={{ fill: '#60a5fa', r: 3, strokeWidth: 1, stroke: '#fff' }}
                  activeDot={{ r: 5, fill: '#3b82f6' }}
                  isAnimationActive={true}
                  animationDuration={800}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  }

  if (chartType === 'pieOnly') {
    return (
      <div className="group relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-300/30 to-pink-300/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
        <div className="relative bg-white backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-xl p-4 border border-gray-200 hover:border-purple-300 transition-all duration-500">
          <div className="flex flex-col gap-1 mb-3">
            <h2 className="text-lg font-bold text-purple-700">CHART</h2>
            <p className="text-xs text-gray-500">Spending breakdown</p>
          </div>
          <div className="bg-purple-50/50 rounded-lg p-2 border border-purple-100 flex justify-center">
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={spendingByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  animationDuration={1000}
                >
                  {spendingByCategory.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={colors[index % colors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => `$${value.toLocaleString()}`}
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #a855f7',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    padding: '6px 10px',
                    fontSize: '11px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  }

  if (chartType === 'pieWithBreakdown') {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Pie Chart */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-300/30 to-pink-300/30 rounded-2xl sm:rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
            <div className="relative bg-white backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-xl p-4 sm:p-6 border border-gray-200 hover:border-purple-300 transition-all duration-500">
              <div className="flex flex-col gap-2 mb-4">
                <h2 className="text-lg sm:text-xl font-bold text-purple-700">Spending by Category</h2>
                <p className="text-xs text-gray-500">Category breakdown</p>
              </div>
              <div className="bg-purple-50/50 rounded-lg sm:rounded-2xl p-2 sm:p-4 border border-purple-100 flex justify-center h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={spendingByCategory}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      animationBegin={0}
                      animationDuration={1200}
                      animationEasing="ease-out"
                    >
                      {spendingByCategory.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={colors[index % colors.length]}
                          style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => `$${value.toLocaleString()}`}
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        border: '2px solid #a855f7',
                        borderRadius: '12px',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                        padding: '8px 12px',
                      }}
                      labelStyle={{ color: '#6b21a8', fontWeight: 'bold', fontSize: '12px' }}
                      wrapperStyle={{ outline: 'none' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="bg-white backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-lg p-4 sm:p-6 border border-gray-200">
            <div className="flex flex-col gap-2 mb-4">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800">Category Breakdown</h3>
              <p className="text-xs text-gray-500">Grocery list details</p>
            </div>
            <div className="space-y-2">
              {spendingByCategory.map((category, index) => (
                <div key={index} className="flex items-center justify-between p-2 sm:p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div
                      className="w-3 h-3 sm:w-4 sm:h-4 rounded-full"
                      style={{ backgroundColor: colors[index % colors.length] }}
                    ></div>
                    <span className="text-xs sm:text-sm font-medium text-gray-700">{category.name}</span>
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-gray-900">${category.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-700">Total</span>
                <span className="text-lg sm:text-xl font-bold text-purple-600">
                  ${spendingByCategory.reduce((sum, cat) => sum + cat.value, 0).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
