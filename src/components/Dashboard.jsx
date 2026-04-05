import SummaryCard from './SummaryCard';
import Charts from './Charts';
import TransactionsTable from './TransactionsTable';
import Sidebar from './Sidebar';
import "tailwindcss";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  summaryMetrics,
  spendingByCategory,
  colors,
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

  const displayedCategories = spendingByCategory.slice(0, 5);
  const hasMoreCategories = spendingByCategory.length > 5;

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
    <div className="flex h-screen bg-white">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50">
          <div className="container mx-auto">
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
            <div className="mb-6 flex items-center gap-2 bg-white rounded-lg p-3 border border-gray-200">
              <input
                type="text"
                placeholder="Search Here"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 focus:outline-none text-sm"
              />
              <button className="text-blue-600 hover:text-blue-700">
                🔍
              </button>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Overview and Transactions */}
              <div className="lg:col-span-2 space-y-6">
                {/* Overview Chart */}
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-gray-800">Overview</h2>
                    <select className="px-3 py-1 border border-blue-600 rounded-full text-xs font-semibold text-white bg-blue-600 focus:outline-none">
                      <option>All List</option>
                    </select>
                  </div>
                  <Charts chartType="lineOnly" />
                </div>

                {/* Transactions Table */}
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                    <h2 className="text-lg font-bold text-gray-800">Recent Transactions</h2>
                    {userRole === 'Admin' && (
                      <button
                        onClick={() => setShowAddModal(true)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm transition-colors"
                      >
                        + Add Transaction
                      </button>
                    )}
                  </div>
                  <TransactionsTable
                    transactions={filteredTransactions}
                    onSort={setSortBy}
                    userRole={userRole}
                    onAdd={() => setShowAddModal(true)}
                    onEdit={(transaction) => {
                      setEditingTransaction(transaction);
                      setShowEditModal(true);
                    }}
                  />
                </div>
              </div>

              {/* Right Column - Profile, Spending, and Monthly Breakdown */}
              <div className="space-y-6">
                {/* Profile Card */}
                <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-lg p-8 text-white border-2 border-blue-600">
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
                      {(
                        [
                          { label: 'Service 01', percent: 75 },
                          { label: 'Service 02', percent: 65 },
                          { label: 'Service 03', percent: 85 },
                          { label: 'Service 04', percent: 55 },
                          { label: 'Service 05', percent: 90 },
                        ]
                      ).map((item, idx) => (
                        <div key={idx}>
                          <div className="flex justify-between mb-1">
                            <span className="text-xs font-semibold text-blue-200">{item.label}</span>
                            <span className="text-xs font-semibold text-blue-200">{item.percent}%</span>
                          </div>
                          <div className="w-full bg-blue-500 rounded-full h-1.5">
                            <div className="bg-cyan-300 h-1.5 rounded-full" style={{ width: `${item.percent}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Spending Distribution Section */}
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <h2 className="text-lg font-bold text-gray-800 mb-4">Spending Distribution</h2>
                  <div className="h-48 mb-4">
                    <Charts chartType="pieOnly" />
                  </div>
                  <div className="space-y-3">
                    {displayedCategories.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: colors[idx % colors.length] }}></div>
                        <span className="text-sm text-gray-600 truncate">{item.name}</span>
                        <span className="text-base font-semibold text-gray-800 ml-auto">${item.value.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                  {hasMoreCategories && (
                    <div className="mt-4 text-right">
                      <Link to="/pie-chart" className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                        View More &rarr;
                      </Link>
                    </div>
                  )}
                </div>

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
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
