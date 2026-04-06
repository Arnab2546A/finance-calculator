import SummaryCard from './SummaryCard';
import Charts from './Charts';
import TransactionsTable from './TransactionsTable';
import Sidebar from './Sidebar';
import "tailwindcss";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  spendingByCategory,
  colors,
} from '../data/financialData';

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const filterType = 'All';
  const [sortBy, setSortBy] = useState('date');
  const [userRole, setUserRole] = useState('Viewer');
  const handleAddTransaction = () => {};
  const handleEditTransaction = () => {};

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

  const thisMonthExpenseTotal = allTransactions
    .filter((transaction) => transaction.type === 'Expense')
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const lastMonthExpenseTotal = lastMonthTransactions
    .filter((transaction) => transaction.type === 'Expense')
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const thisMonthIncomeTotal = allTransactions
    .filter((transaction) => transaction.type === 'Income')
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const thisMonthSavings = thisMonthIncomeTotal - thisMonthExpenseTotal;
  const expenseDifference = thisMonthExpenseTotal - lastMonthExpenseTotal;
  const expenseChangePercent = lastMonthExpenseTotal > 0
    ? ((expenseDifference / lastMonthExpenseTotal) * 100).toFixed(0)
    : '0';

  const weeklySavingGoals = [
    { week: 'Week 1', amount: 2000 },
    { week: 'Week 2', amount: 3500 },
    { week: 'Week 3', amount: 1500 },
    { week: 'Week 4', amount: 2500 },
  ];

  const displayedCategories = spendingByCategory.slice(0, 4);
  const hasMoreCategories = spendingByCategory.length > 4;

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
                        onClick={handleAddTransaction}
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
                    onAdd={handleAddTransaction}
                    onEdit={handleEditTransaction}
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

                  {/* Insights Section */}
                  <div>
                    <div className="mb-4">
                      <h4 className="text-lg font-bold text-white">Insights</h4>
                    </div>

                    <div className="mt-4 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-xl shadow-[0_10px_30px_rgba(15,23,42,0.16)]">
                      <h5 className="text-sm font-semibold text-white tracking-wide mb-3">Monthly Expense Breakdown</h5>

                      <div className="rounded-xl bg-white/10 border border-white/10 p-3">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-blue-100/80 mb-2">Saving Goal</p>
                        <div className="space-y-2">
                          {weeklySavingGoals.map((goal) => (
                            <div key={goal.week} className="flex items-center justify-between text-xs">
                              <span className="text-blue-50/90">{goal.week}</span>
                              <span className="font-semibold text-white">
                                {goal.amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="rounded-xl border border-emerald-200/30 bg-emerald-500/10 p-3">
                          <p className="text-[11px] uppercase tracking-wider text-emerald-100/90 mb-1">Saved</p>
                          <p className="text-sm font-semibold text-white">
                            {thisMonthSavings.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })}
                          </p>
                        </div>
                        <div className="rounded-xl border border-amber-200/30 bg-amber-500/10 p-3">
                          <p className="text-[11px] uppercase tracking-wider text-amber-100/90 mb-1">Alert</p>
                          <p className="text-sm font-semibold text-white">
                            {expenseDifference > 0
                              ? `Spending is higher by ${Math.abs(Number(expenseChangePercent))}%`
                              : 'Spending is under control'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Spending Distribution Section */}
                <div className="bg-white rounded-lg p-6 border border-gray-200 min-w-0">
                  <h2 className="text-lg font-bold text-gray-800 mb-4">Spending Distribution</h2>
                  <div className="h-64 mb-5 min-w-0">
                    <Charts chartType="pieOnly" />
                  </div>
                  <div className="px-6 sm:px-8">
                    <div className="max-w-[420px] ml-12 sm:ml-14 md:ml-16 mr-auto space-y-2">
                      {displayedCategories.map((item, idx) => (
                        <div key={idx} className="flex w-full min-w-0 items-center gap-2 py-1.5 pl-6 sm:pl-8 md:pl-10 lg:pl-12">
                          <div className="w-3 h-3 rounded-sm shrink-0 ml-4 sm:ml-6 md:ml-8 lg:ml-10" style={{ backgroundColor: colors[idx % colors.length] }}></div>
                          <span className="min-w-0 truncate text-[12px] sm:text-[13px] font-medium text-gray-700">{item.name}</span>
                          <span className="shrink-0 text-[12px] sm:text-[13px] font-semibold text-gray-800">${item.value.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {hasMoreCategories && (
                    <div className="mt-4 px-6 sm:px-8">
                      <div className="max-w-[420px] ml-12 sm:ml-14 md:ml-16 mr-auto text-right pr-2 pl-6 sm:pl-8 md:pl-10 lg:pl-12">
                        <Link to="/pie-chart" className="text-[12px] sm:text-[13px] font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                          View More &rarr;
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
