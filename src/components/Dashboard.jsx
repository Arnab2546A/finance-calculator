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
  const [weeklySpendingTarget, setWeeklySpendingTarget] = useState(2500);
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

  const thisMonthExpenseTotal = allTransactions
    .filter((transaction) => transaction.type === 'Expense')
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const thisMonthIncomeTotal = allTransactions
    .filter((transaction) => transaction.type === 'Income')
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  // Calculate actual weekly spending and savings
  const actualWeeklySpending = thisMonthExpenseTotal;
  const actualSavings = thisMonthIncomeTotal - weeklySpendingTarget;
  const spendingVsTarget = actualWeeklySpending - weeklySpendingTarget;
  const isOverBudget = spendingVsTarget > 0;
  const budgetDifference = Math.abs(spendingVsTarget);
  const budgetDifferencePercent = weeklySpendingTarget > 0 
    ? ((budgetDifference / weeklySpendingTarget) * 100).toFixed(0)
    : '0';

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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Overview and Transactions */}
              <div className="lg:col-span-2 space-y-8">
                {/* Overview Chart */}
                <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-[1.01]">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Overview</h2>
                      <p className="text-xs text-gray-500 mt-1">Your spending trends</p>
                    </div>
                    <select className="px-4 py-2 border border-blue-600 rounded-full text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none transition-colors">
                      <option>All List</option>
                    </select>
                  </div>
                  <Charts chartType="lineOnly" />
                </div>

                {/* Transactions Table */}
                <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-[1.01]">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Recent Transactions</h2>
                      <p className="text-xs text-gray-500 mt-1">Latest activities</p>
                    </div>
                    {userRole === 'Admin' && (
                      <button
                        onClick={handleAddTransaction}
                        className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-semibold text-sm transition-all duration-300 hover:shadow-lg transform hover:scale-105"
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

              {/* Right Column - Profile, Spending, and Insights */}
              <div className="space-y-8">
                {/* Profile Card */}
                <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-xl p-8 lg:p-10 text-white border-2 border-blue-600 shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
                  {/* Profile Section */}
                  <div className="flex flex-col items-center justify-center mb-8">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-5xl shadow-xl">
                      👤
                    </div>
                    <h3 className="text-3xl font-bold mt-4">Jane Lauren</h3>
                    <p className="text-blue-200 text-sm mt-2">Premium Member</p>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {[
                      { 
                        label: 'Total Balance', 
                        value: actualSavings.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })
                      },
                      { 
                        label: 'Total Income', 
                        value: thisMonthIncomeTotal.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })
                      },
                      { 
                        label: 'Total Expenses', 
                        value: thisMonthExpenseTotal.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })
                      }
                    ].map((stat, idx) => (
                      <div key={idx} className="text-center p-4 rounded-lg bg-white/10 border border-white/20 backdrop-blur">
                        <p className="text-blue-200 text-xs font-semibold mb-2 uppercase tracking-wider">{stat.label}</p>
                        <p className="text-3xl font-bold text-cyan-300">{stat.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="border-t border-blue-500/50 mb-6"></div>

                  {/* Insights Section */}
                  <div className="relative rounded-2xl border border-white/25 bg-gradient-to-br from-white/14 via-white/10 to-white/8 p-6 lg:p-8 backdrop-blur-xl shadow-[0_20px_50px_rgba(15,23,42,0.4)] overflow-hidden group">
                    {/* Animated Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>
                    
                    <div className="relative z-10">
                      {/* Weekly Spending Goals Section */}
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg">
                              💰
                            </div>
                            <p className="text-base lg:text-lg font-bold uppercase tracking-widest text-white">Weekly Target</p>
                          </div>
                          {userRole === 'Admin' ? (
                            <input
                              type="number"
                              value={weeklySpendingTarget}
                              onChange={(e) => setWeeklySpendingTarget(Number(e.target.value))}
                              className="w-28 px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-white font-bold text-sm lg:text-base text-right focus:outline-none focus:border-cyan-400/60 transition-colors"
                            />
                          ) : (
                            <p className="text-lg lg:text-xl font-black text-cyan-300">
                              {weeklySpendingTarget.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })}
                            </p>
                          )}
                        </div>
                        {/* Weekly Breakdown */}
                        <div>
                          <p className="text-xs lg:text-sm font-bold uppercase tracking-widest text-blue-100 mb-3">Weekly Breakdown</p>
                          <div className="space-y-2">
                            {[
                              { week: 'Week 1', amount: 2000 },
                              { week: 'Week 2', amount: 3500 },
                              { week: 'Week 3', amount: 1500 },
                              { week: 'Week 4', amount: 2500 },
                            ].map((goal, idx) => (
                              <div key={goal.week} 
                                style={{
                                  animation: `slideIn 0.5s ease-out ${idx * 0.12}s both`
                                }}
                                className="flex items-center justify-between px-1 py-1.5">
                                <span className="text-blue-50 font-semibold text-xs lg:text-sm">{goal.week}</span>
                                <span className="font-bold text-cyan-300 text-sm lg:text-base">
                                  {goal.amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Saved and Alert Cards */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className={`relative group/saved rounded-xl border p-5 overflow-hidden ${actualSavings >= 0 ? 'border-emerald-400/50 bg-gradient-to-br from-emerald-500/20 via-emerald-400/10 to-transparent' : 'border-rose-400/50 bg-gradient-to-br from-rose-500/20 via-rose-400/10 to-transparent'}`}>
                          {/* Animated background */}
                          <div className={`absolute inset-0 ${actualSavings >= 0 ? 'bg-gradient-to-br from-emerald-600/0 to-emerald-600/5' : 'bg-gradient-to-br from-rose-600/0 to-rose-600/5'}`}></div>
                          <div className="relative">
                            <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${actualSavings >= 0 ? 'text-emerald-100' : 'text-rose-100'}`}>💰 Total Savings</p>
                            <p className="text-2xl lg:text-3xl font-black text-white leading-tight mb-2 drop-shadow-lg">
                              {actualSavings.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })}
                            </p>
                            <div className={`h-1 w-12 rounded-full transition-all duration-500 ${actualSavings >= 0 ? 'bg-gradient-to-r from-emerald-400 to-emerald-300' : 'bg-gradient-to-r from-rose-400 to-rose-300'}`}></div>
                          </div>
                        </div>
                        
                        <div className={`relative group/alert rounded-xl border p-5 overflow-hidden ${isOverBudget ? 'border-rose-500/50 bg-gradient-to-br from-rose-600/25 via-rose-500/12 to-transparent animate-pulse-subtle' : 'border-emerald-500/50 bg-gradient-to-br from-emerald-600/25 via-emerald-500/12 to-transparent'}`}>
                          {/* Animated background */}
                          <div className={`absolute inset-0 ${isOverBudget ? 'bg-gradient-to-br from-rose-700/0 to-rose-700/5' : 'bg-gradient-to-br from-emerald-700/0 to-emerald-700/5'}`}></div>
                          <div className={`absolute top-0 right-0 w-20 h-20 ${isOverBudget ? 'bg-rose-500/10' : 'bg-emerald-500/10'} rounded-full blur-2xl -mr-6 -mt-6`}></div>
                          <div className="relative">
                            <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${isOverBudget ? 'text-rose-100' : 'text-emerald-100'}`}>{isOverBudget ? '⚠️' : '✅'} {isOverBudget ? 'Over' : 'Under'}</p>
                            <p className="text-2xl lg:text-3xl font-black text-white leading-tight mb-2 drop-shadow-lg">
                              {isOverBudget ? '+' : '-'}{budgetDifferencePercent}%
                            </p>
                            <p className={`text-xs lg:text-sm font-semibold flex items-center gap-1.5 ${isOverBudget ? 'text-rose-100/90' : 'text-emerald-100/90'}`}>
                              <span className={`inline-block w-2 h-2 rounded-full ${isOverBudget ? 'bg-rose-400 animate-pulse' : 'bg-emerald-400'}`}></span>
                              <span className="truncate">{isOverBudget 
                                ? `+${budgetDifference.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })}` 
                                : `-${budgetDifference.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })}`
                              }</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Spending Distribution Section */}
                <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-[1.01] min-w-0">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Spending Distribution</h2>
                    <p className="text-xs text-gray-500 mt-1">Breakdown by category</p>
                  </div>
                  <div className="h-64 mb-8 min-w-0">
                    <Charts chartType="pieOnly" />
                  </div>
                  <div className="px-6 sm:px-8">
                    <div className="max-w-[420px] ml-12 sm:ml-14 md:ml-16 mr-auto space-y-4">
                      {displayedCategories.map((item, idx) => (
                        <div 
                          key={idx} 
                          className="flex w-full min-w-0 items-center gap-4 py-3.5 pl-6 sm:pl-8 md:pl-10 lg:pl-12 px-4 rounded-lg bg-gray-50 hover:bg-blue-50 transition-all duration-300 transform hover:translate-x-1 group"
                        >
                          <div 
                            className="w-5 h-5 rounded-md shrink-0 ml-4 sm:ml-6 md:ml-8 lg:ml-10 shadow-md group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-125" 
                            style={{ backgroundColor: colors[idx % colors.length] }}
                          ></div>
                          <span className="min-w-0 truncate text-sm font-semibold text-gray-800">{item.name}</span>
                          <span className="shrink-0 text-base font-bold text-gray-900">${item.value.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {hasMoreCategories && (
                    <div className="mt-6 px-6 sm:px-8">
                      <div className="max-w-[420px] ml-12 sm:ml-14 md:ml-16 mr-auto text-right pr-2 pl-6 sm:pl-8 md:pl-10 lg:pl-12">
                        <Link to="/pie-chart" className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-2 hover:gap-3">
                          View More <span className="text-lg">→</span>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>

            <style>{`
              @keyframes slideIn {
                from {
                  opacity: 0;
                  transform: translateY(10px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
              @keyframes pulse-subtle {
                0%, 100% {
                  opacity: 1;
                }
                50% {
                  opacity: 0.8;
                }
              }
              .animate-pulse-subtle {
                animation: pulse-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
              }
            `}</style>
          </div>
        </main>
      </div>
    </div>
  );
}
