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
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <div className="min-h-screen p-8">
          {/* Header Section */}
          <div className="mb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-3xl font-bold text-blue-700">Overview</h1>
            <div className="flex gap-3 items-center flex-wrap">
              {/* Role Switcher */}
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-300">
                <span className="text-sm font-semibold text-gray-700">Role:</span>
                <select
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm font-semibold bg-white"
                >
                  <option value="Viewer">Viewer</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              <input
                type="text"
                placeholder="Search Here"
                className="px-4 py-2 bg-white border border-gray-300 text-gray-800 placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-sm text-sm"
              />
              <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm transition-colors duration-300">
                ↓ All List
              </button>
            </div>
          </div>

          {/* Main 2-Column Grid Layout */}
          <div className="grid grid-cols-3 gap-8">
            {/* LEFT COLUMN - Overview & Chart */}
            <div className="col-span-2 space-y-8">
              {/* Overview Chart */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h2 className="text-lg font-bold text-gray-800 mb-6">Overview</h2>
                <Charts chartType="lineOnly" />
              </div>

              {/* Chart Section Split into Two Boxes */}
              <div className="grid grid-cols-2 gap-8">
                {/* Pie Chart */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <h2 className="text-lg font-bold text-gray-800 mb-6">CHART</h2>
                  <Charts chartType="pieOnly" />
                </div>

                {/* Legend/Breakdown */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <h2 className="text-lg font-bold text-gray-800 mb-6">Category Breakdown</h2>
                  <div className="space-y-4">
                    {[
                      { name: 'Groceries', amount: '$1,200', color: 'bg-blue-500' },
                      { name: 'Entertainment', amount: '$800', color: 'bg-purple-500' },
                      { name: 'Utilities', amount: '$450', color: 'bg-pink-500' },
                      { name: 'Transportation', amount: '$600', color: 'bg-cyan-500' },
                      { name: 'Healthcare', amount: '$350', color: 'bg-emerald-500' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4">
                        <div className={`w-4 h-4 rounded-full ${item.color}`} />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800">{item.name}</p>
                          <p className="text-xs text-gray-500">Lorem Ipsum</p>
                        </div>
                        <p className="text-sm font-bold text-gray-800">{item.amount}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Transactions Section */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold text-gray-800">All Transactions</h2>
                  {userRole === 'Admin' && (
                    <button
                      onClick={() => setShowAddModal(true)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold text-sm transition-colors duration-300 flex items-center gap-2"
                    >
                      + Add Transaction
                    </button>
                  )}
                </div>
                
                {/* Controls */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  {/* Search */}
                  <input
                    type="text"
                    placeholder="Search by name or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
                  />

                  {/* Filter */}
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm bg-white"
                  >
                    <option value="All">All</option>
                    <option value="Income">Income</option>
                    <option value="Expense">Expense</option>
                  </select>

                  {/* Sort */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm bg-white"
                  >
                    <option value="date">Sort by Date</option>
                    <option value="amount">Sort by Amount</option>
                  </select>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Date</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Description</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Category</th>
                        <th className="px-4 py-3 text-center font-semibold text-gray-700">Type</th>
                        <th className="px-4 py-3 text-right font-semibold text-gray-700">Amount</th>
                        {userRole === 'Admin' && (
                          <th className="px-4 py-3 text-center font-semibold text-gray-700">Actions</th>
                        )}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredTransactions.map((transaction) => (
                        <tr key={transaction.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-gray-800">{new Date(transaction.date).toLocaleDateString()}</td>
                          <td className="px-4 py-3 text-gray-800">{transaction.description}</td>
                          <td className="px-4 py-3 text-gray-600">{transaction.category}</td>
                          <td className="px-4 py-3 text-center">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              transaction.type === 'Income' 
                                ? 'bg-emerald-100 text-emerald-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {transaction.type}
                            </span>
                          </td>
                          <td className={`px-4 py-3 text-right font-semibold ${
                            transaction.type === 'Income' ? 'text-emerald-600' : 'text-red-600'
                          }`}>
                            {transaction.type === 'Income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                          </td>
                          {userRole === 'Admin' && (
                            <td className="px-4 py-3 text-center">
                              <div className="flex gap-2 justify-center">
                                <button
                                  onClick={() => {
                                    setEditingTransaction(transaction);
                                    setShowEditModal(true);
                                  }}
                                  className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-xs font-semibold transition-colors"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => {
                                    alert(`Delete transaction: ${transaction.description}`);
                                  }}
                                  className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-xs font-semibold transition-colors"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN - Profile Card (Full Height) */}
            <div className="col-span-1">
              <div className="bg-gradient-to-b from-blue-600 to-purple-700 rounded-3xl shadow-2xl p-8 border border-blue-500/30 h-full">
                {/* Profile Section */}
                <div className="text-center mb-8">
                  <div className="w-32 h-32 bg-white rounded-full mx-auto mb-6 flex items-center justify-center shadow-xl">
                    <span className="text-6xl">👤</span>
                  </div>
                  <h3 className="text-white font-bold text-2xl">Jane Lauren</h3>
                </div>

                {/* Top Stats Grid */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center">
                    <p className="text-white/70 text-xs font-medium mb-2">Earning</p>
                    <p className="text-2xl font-bold text-cyan-300">${summaryMetrics.totalBalance.toLocaleString()}</p>
                    <p className="text-xs text-white/50 mt-1">Lorem ipsum</p>
                  </div>
                  <div className="text-center">
                    <p className="text-white/70 text-xs font-medium mb-2">Bonus</p>
                    <p className="text-2xl font-bold text-emerald-300">${summaryMetrics.totalIncome.toLocaleString()}</p>
                    <p className="text-xs text-white/50 mt-1">Lorem ipsum</p>
                  </div>
                  <div className="text-center">
                    <p className="text-white/70 text-xs font-medium mb-2">Favorite</p>
                    <p className="text-2xl font-bold text-rose-300">${summaryMetrics.totalExpenses.toLocaleString()}</p>
                    <p className="text-xs text-white/50 mt-1">Lorem ipsum</p>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-white/20 my-6" />

                {/* Top Rankings Inside Box */}
                <div>
                  <h3 className="text-white font-bold text-sm mb-4">TOP RANKING</h3>
                  <div className="space-y-3">
                    {[
                      { name: 'Lorem ipsum', percent: 29 },
                      { name: 'Dolor sit', percent: 18 },
                      { name: 'Consectetur', percent: 26 },
                      { name: 'Adipiscing', percent: 45 },
                      { name: 'Sed Diam', percent: 39 },
                      { name: 'Nonummy', percent: 67 },
                      { name: 'Nibh Euismod', percent: 52 },
                      { name: 'Tincidunt', percent: 85 },
                    ].map((item, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-white/70 text-xs font-medium truncate">{item.name}</span>
                          <span className="text-white/60 text-xs ml-2">{item.percent}%</span>
                        </div>
                        <div className="h-1 bg-white/20 rounded-full overflow-hidden">
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

          {/* Footer */}
          <div className="text-center py-8 mt-12 border-t border-gray-200">
            <p className="text-gray-500 text-xs sm:text-sm">© 2024 FinTrack. All rights reserved.</p>
          </div>

          {/* Add Transaction Modal */}
          {showAddModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Transaction</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                    <input
                      type="text"
                      placeholder="e.g., Coffee Shop"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Amount</label>
                      <input
                        type="number"
                        placeholder="0.00"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 bg-white">
                        <option value="Expense">Expense</option>
                        <option value="Income">Income</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 bg-white">
                        <option>Food</option>
                        <option>Travel</option>
                        <option>Entertainment</option>
                        <option>Utilities</option>
                        <option>Health</option>
                        <option>Income</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                      <input
                        type="date"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      alert('Transaction added successfully!');
                      setShowAddModal(false);
                    }}
                    className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Edit Transaction Modal */}
          {showEditModal && editingTransaction && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Transaction</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                    <input
                      type="text"
                      defaultValue={editingTransaction.description}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Amount</label>
                      <input
                        type="number"
                        defaultValue={editingTransaction.amount}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
                      <select defaultValue={editingTransaction.type} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 bg-white">
                        <option value="Expense">Expense</option>
                        <option value="Income">Income</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                      <select defaultValue={editingTransaction.category} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 bg-white">
                        <option>Food</option>
                        <option>Travel</option>
                        <option>Entertainment</option>
                        <option>Utilities</option>
                        <option>Health</option>
                        <option>Income</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                      <input
                        type="date"
                        defaultValue={editingTransaction.date}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      alert(`Transaction updated: ${editingTransaction.description}`);
                      setShowEditModal(false);
                    }}
                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
