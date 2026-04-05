import SummaryCard from './SummaryCard';
import Charts from './Charts';
import TransactionsTable from './TransactionsTable';
import Sidebar from './Sidebar';
import "tailwindcss";
import { useState } from 'react';
import {
  summaryMetrics,
} from '../data/financialData';

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [sortBy, setSortBy] = useState('date');
  const [userRole, setUserRole] = useState('Viewer');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  // Sample transactions data
  const allTransactions = [
    { id: 1, date: '2024-04-01', description: 'Grocery Store', amount: 52.50, category: 'Food', type: 'Expense' },
    { id: 2, date: '2024-04-02', description: 'Salary Deposit', amount: 3000.00, category: 'Income', type: 'Income' },
    { id: 3, date: '2024-04-03', description: 'Gas Station', amount: 45.00, category: 'Travel', type: 'Expense' },
    { id: 4, date: '2024-04-04', description: 'Restaurant', amount: 75.30, category: 'Food', type: 'Expense' },
    { id: 5, date: '2024-04-05', description: 'Movie Tickets', amount: 25.00, category: 'Entertainment', type: 'Expense' },
    { id: 6, date: '2024-04-06', description: 'Freelance Payment', amount: 500.00, category: 'Income', type: 'Income' },
    { id: 7, date: '2024-04-07', description: 'Electric Bill', amount: 120.00, category: 'Utilities', type: 'Expense' },
    { id: 8, date: '2024-04-08', description: 'Coffee Shop', amount: 6.50, category: 'Food', type: 'Expense' },
    { id: 9, date: '2024-04-09', description: 'Gym Membership', amount: 30.00, category: 'Health', type: 'Expense' },
    { id: 10, date: '2024-04-10', description: 'Bonus Payment', amount: 250.00, category: 'Income', type: 'Income' },
  ];

  // Last month's transactions data (for comparison)
  const lastMonthTransactions = [
    { id: 11, date: '2024-03-01', description: 'Grocery Store', amount: 45.00, category: 'Food', type: 'Expense' },
    { id: 12, date: '2024-03-02', description: 'Gas Station', amount: 50.00, category: 'Travel', type: 'Expense' },
    { id: 13, date: '2024-03-05', description: 'Restaurant', amount: 55.00, category: 'Food', type: 'Expense' },
    { id: 14, date: '2024-03-10', description: 'Movie Tickets', amount: 20.00, category: 'Entertainment', type: 'Expense' },
    { id: 15, date: '2024-03-15', description: 'Electric Bill', amount: 110.00, category: 'Utilities', type: 'Expense' },
    { id: 16, date: '2024-03-20', description: 'Coffee Shop', amount: 8.00, category: 'Food', type: 'Expense' },
    { id: 17, date: '2024-03-25', description: 'Gym Membership', amount: 30.00, category: 'Health', type: 'Expense' },
  ];

  // Calculate category spending
  const calculateCategorySpending = (transactions) => {
    const spending = {};
    transactions
      .filter(t => t.type === 'Expense')
      .forEach(t => {
        spending[t.category] = (spending[t.category] || 0) + t.amount;
      });
    return spending;
  };

  // Get insights
  const thisMonthSpending = calculateCategorySpending(allTransactions);
  const lastMonthSpending = calculateCategorySpending(lastMonthTransactions);

  // Find highest spending category this month
  const highestCategory = Object.entries(thisMonthSpending).sort((a, b) => b[1] - a[1])[0];

  // Calculate month-over-month comparison
  const generateInsights = () => {
    const insights = [];

    // Highest spending insight
    if (highestCategory) {
      insights.push({
        type: 'highest',
        category: highestCategory[0],
        amount: highestCategory[1],
        emoji: '📊'
      });
    }

    // Month-over-month comparison
    Object.entries(thisMonthSpending).forEach(([category, thisMonth]) => {
      const lastMonth = lastMonthSpending[category] || 0;
      if (lastMonth > 0) {
        const percentChange = ((thisMonth - lastMonth) / lastMonth) * 100;
        if (Math.abs(percentChange) >= 10) { // Only show significant changes
          insights.push({
            type: 'comparison',
            category,
            thisMonth,
            lastMonth,
            percentChange,
            emoji: percentChange > 0 ? '📈' : '📉'
          });
        }
      }
    });

    return insights.slice(0, 3); // Show top 3 insights
  };

  const insights = generateInsights();

  // Filter transactions
  let filteredTransactions = allTransactions.filter(t => {
    const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         t.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'All' || t.type === filterType;
    return matchesSearch && matchesFilter;
  });

  // Sort transactions
  filteredTransactions.sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date) - new Date(a.date);
    } else if (sortBy === 'amount') {
      return b.amount - a.amount;
    }
    return 0;
  });

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-y-auto bg-gray-100">
        <div className="min-h-screen p-4 sm:p-6 lg:p-8">
          {/* Header Section */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Financial Dashboard</h1>
              <p className="text-gray-600 text-sm mt-1">Track your income and expenses</p>
            </div>
            
            {/* Role Selector */}
            <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg border border-gray-300">
              <label className="text-sm font-semibold text-gray-700">Role:</label>
              <select
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
                className="px-3 py-1 border-l border-gray-300 focus:outline-none text-sm font-semibold bg-white"
              >
                <option value="Viewer">Viewer</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex items-center gap-2 bg-white rounded-lg p-3 border border-gray-200">
            <input
              type="text"
              placeholder="Search Here"
              className="flex-1 focus:outline-none text-sm"
            />
            <button className="text-blue-600 hover:text-blue-700">
              🔍
            </button>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-3 gap-6">
            {/* Left Column - Overview and Pie Chart */}
            <div className="space-y-6 col-span-2">
              {/* Overview Chart */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-base font-semibold text-gray-900">Overview</h2>
                  <select className="px-3 py-1 border border-blue-600 rounded-full text-xs font-semibold text-white bg-blue-600 focus:outline-none">
                    <option>All List</option>
                  </select>
                </div>
                <Charts chartType="lineOnly" />
              </div>

              {/* Monthly Expense & Pie Chart Section */}
              <div className="grid grid-cols-2 gap-6">
                {/* Monthly Expense Breakdown */}
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <h2 className="text-lg font-bold text-gray-800 mb-4">Monthly Expense Breakdown</h2>
                  <div className="space-y-4">
                    <p className="text-sm font-semibold text-gray-600">👉 Show:</p>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between"><span>Week 1</span> <span className="font-semibold">₹2000</span></div>
                      <div className="flex justify-between"><span>Week 2</span> <span className="font-semibold">₹3500</span></div>
                      <div className="flex justify-between"><span>Week 3</span> <span className="font-semibold">₹1500</span></div>
                    </div>
                  </div>
                </div>

                {/* Spending Distribution Section */}
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <h2 className="text-base font-semibold text-gray-900 mb-4">Spending Distribution</h2>
                  <div className="h-48 mb-4">
                    <Charts chartType="pieOnly" />
                  </div>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                    {([
                      { name: 'Groceries', color: '#3b82f6', value: '$1,200' },
                      { name: 'Entertainment', color: '#ef4444', value: '$800' },
                      { name: 'Utilities', color: '#10b981', value: '$450' },
                      { name: 'Transportation', color: '#f59e0b', value: '$600' },
                      { name: 'Healthcare', color: '#a855f7', value: '$350' },
                    ]).map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }}></div>
                        <span className="text-sm text-gray-600">{item.name}</span>
                        <span className="text-sm font-semibold text-gray-800 ml-auto">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Profile Card */}
            <div className="col-span-1">
              <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-lg p-8 text-white border-2 border-blue-600 h-full">
                {/* Profile Section */}
                <div className="text-center mb-8">
                  <div className="w-28 h-28 bg-white rounded-full mx-auto mb-4 flex items-center justify-center text-5xl shadow-lg">
                    👤
                  </div>
                  <h3 className="text-2xl font-bold">Jane Lauren</h3>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center">
                    <p className="text-blue-200 text-xs font-semibold mb-2">Earning</p>
                    <p className="text-2xl font-bold text-cyan-300">$2314</p>
                  </div>
                  <div className="text-center">
                    <p className="text-blue-200 text-xs font-semibold mb-2">Bonus</p>
                    <p className="text-2xl font-bold text-cyan-300">$200</p>
                  </div>
                  <div className="text-center">
                    <p className="text-blue-200 text-xs font-semibold mb-2">Favorite</p>
                    <p className="text-2xl font-bold text-cyan-300">$2,340</p>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-blue-600 mb-6"></div>

                {/* Overall Stats */}
                <div>
                  <h4 className="text-sm font-bold mb-4">Overall Stats</h4>
                  <div className="space-y-4">
                    {[
                      { label: 'Service 01', percent: 75 },
                      { label: 'Service 02', percent: 65 },
                      { label: 'Service 03', percent: 85 },
                      { label: 'Service 04', percent: 55 },
                      { label: 'Service 05', percent: 90 },
                    ].map((item, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-medium text-blue-200">{item.label}</span>
                          <span className="text-xs font-semibold text-cyan-300">{item.percent}%</span>
                        </div>
                        <div className="h-2 bg-blue-600/50 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full"
                            style={{ width: `${item.percent}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Transactions Section Below */}
          <div className="mt-8 bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-base font-semibold text-gray-900">Recent Transactions</h2>
              {userRole === 'Admin' && (
                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm transition-colors"
                >
                  + Add Transaction
                </button>
              )}
            </div>

            {/* Filters */}
            <div className="p-6 border-b border-gray-200 space-y-3 bg-gray-50">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
                />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 bg-white text-sm"
                >
                  <option value="All">All Transactions</option>
                  <option value="Income">Income Only</option>
                  <option value="Expense">Expenses Only</option>
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 bg-white text-sm"
                >
                  <option value="date">Recent First</option>
                  <option value="amount">Highest Amount</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Date</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Description</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700 hidden sm:table-cell">Category</th>
                    <th className="px-6 py-3 text-center font-semibold text-gray-700">Type</th>
                    <th className="px-6 py-3 text-right font-semibold text-gray-700">Amount</th>
                    {userRole === 'Admin' && (
                      <th className="px-6 py-3 text-center font-semibold text-gray-700">Action</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.slice(0, 10).map((transaction, idx) => (
                    <tr key={transaction.id} className={`border-b border-gray-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                      <td className="px-6 py-3 text-sm text-gray-700">{new Date(transaction.date).toLocaleDateString()}</td>
                      <td className="px-6 py-3 text-sm font-medium text-gray-900">{transaction.description}</td>
                      <td className="px-6 py-3 text-sm text-gray-600 hidden sm:table-cell">{transaction.category}</td>
                      <td className="px-6 py-3 text-center">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          transaction.type === 'Income' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {transaction.type}
                        </span>
                      </td>
                      <td className={`px-6 py-3 text-right text-sm font-semibold ${
                        transaction.type === 'Income' ? 'text-green-700' : 'text-red-700'
                      }`}>
                        {transaction.type === 'Income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                      </td>
                      {userRole === 'Admin' && (
                        <td className="px-6 py-3 text-center">
                          <button
                            onClick={() => {
                              setEditingTransaction(transaction);
                              setShowEditModal(true);
                            }}
                            className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded text-xs font-semibold transition-colors"
                          >
                            Edit
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Add Transaction Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 shadow-xl max-w-sm w-full">
            <h2 className="text-xl font-bold text-gray-900 mb-6">New Transaction</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                <input type="text" placeholder="Enter description" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Amount</label>
                  <input type="number" placeholder="0.00" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Type</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 bg-white text-sm">
                    <option>Expense</option>
                    <option>Income</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 bg-white text-sm">
                    <option>Food</option>
                    <option>Travel</option>
                    <option>Entertainment</option>
                    <option>Utilities</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Date</label>
                  <input type="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm" />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowAddModal(false)} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 text-sm">Cancel</button>
              <button onClick={() => { alert('Transaction added!'); setShowAddModal(false); }} className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm">Add</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Transaction Modal */}
      {showEditModal && editingTransaction && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 shadow-xl max-w-sm w-full">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Edit Transaction</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                <input type="text" defaultValue={editingTransaction.description} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Amount</label>
                  <input type="number" defaultValue={editingTransaction.amount} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Type</label>
                  <select defaultValue={editingTransaction.type} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 bg-white text-sm">
                    <option>Expense</option>
                    <option>Income</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                  <select defaultValue={editingTransaction.category} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 bg-white text-sm">
                    <option>Food</option>
                    <option>Travel</option>
                    <option>Entertainment</option>
                    <option>Utilities</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Date</label>
                  <input type="date" defaultValue={editingTransaction.date} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm" />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowEditModal(false)} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 text-sm">Cancel</button>
              <button onClick={() => { alert('Updated!'); setShowEditModal(false); }} className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
