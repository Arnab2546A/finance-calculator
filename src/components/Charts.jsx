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
import { useEffect, useRef, useState } from 'react';

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
  const [activeIndex, setActiveIndex] = useState(null);
  const pieContainerRef = useRef(null);
  const [pieContainerSize, setPieContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const node = pieContainerRef.current;
    if (!node) return;

    const updateSize = () => {
      const rect = node.getBoundingClientRect();
      setPieContainerSize({
        width: Math.floor(rect.width),
        height: Math.floor(rect.height),
      });
    };

    updateSize();

    const observer = new ResizeObserver(updateSize);
    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  if (chartType === 'lineOnly') {
    return (
      <div className="group relative h-full">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300/30 to-purple-300/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
        <div className="relative bg-white backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-xl p-4 border border-gray-200 hover:border-blue-300 transition-all duration-500">
          <div className="flex flex-col gap-1 mb-3">
            <h2 className="text-lg font-bold text-blue-700">Overview</h2>
            <p className="text-xs text-gray-500">Balance trend</p>
          </div>
          <div className="bg-blue-50/50 rounded-lg p-2 border border-blue-100 min-w-0">
            <ResponsiveContainer width="100%" height={300} minWidth={0}>
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
    const RADIAN = Math.PI / 180;
    const totalSpending = spendingByCategory.reduce((sum, item) => sum + item.value, 0);
    const pieChartSize = Math.max(220, Math.min(pieContainerSize.width, pieContainerSize.height));

    const renderStyledPieTooltip = ({ active, payload }) => {
      if (!active || !payload || !payload.length) {
        return null;
      }

      const item = payload[0];
      const value = item.value;
      const category = item.name;
      const percentage = ((value / totalSpending) * 100).toFixed(1);

      return (
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.98), rgba(245,250,255,0.95))',
            border: '1px solid rgba(147, 51, 234, 0.2)',
            borderRadius: '16px',
            boxShadow: '0 14px 30px rgba(17, 24, 39, 0.16)',
            padding: '12px 14px',
            minWidth: '180px',
            backdropFilter: 'blur(8px)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '9999px',
                backgroundColor: item.color,
                boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.12)',
              }}
            ></span>
            <span
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: '#111827',
                letterSpacing: '0.2px',
              }}
            >
              {category}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '10px' }}>
            <span style={{ fontSize: '20px', fontWeight: 800, color: '#1d4ed8' }}>${value.toLocaleString()}</span>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: '#6d28d9',
                backgroundColor: 'rgba(139, 92, 246, 0.12)',
                padding: '3px 8px',
                borderRadius: '9999px',
              }}
            >
              {percentage}%
            </span>
          </div>
        </div>
      );
    };

    const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent }) => {
      const radius = outerRadius + 28;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);
      const textAnchor = x > cx ? 'start' : 'end';

      return (
        <text 
          x={x} 
          y={y} 
          fill="#1f2937"
          textAnchor={textAnchor}
          dominantBaseline="central"
          style={{
            fontSize: '15px',
            fontWeight: 700,
          }}
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      );
    };

    return (
      <div ref={pieContainerRef} className="relative w-full h-full min-w-[220px] min-h-[220px]">
        {pieContainerSize.width >= 220 && pieContainerSize.height >= 220 ? (
          <div className="w-full h-full flex items-center justify-center">
            <PieChart width={pieChartSize} height={pieChartSize} margin={{ top: 24, right: 70, bottom: 24, left: 70 }}>
            <defs>
              {/* Enhanced gradients */}
              {colors.map((color, idx) => (
                <radialGradient key={`gradient-${idx}`} id={`gradient-${idx}`}>
                  <stop offset="0%" stopColor={color} stopOpacity={1} />
                  <stop offset="100%" stopColor={color} stopOpacity={0.85} />
                </radialGradient>
              ))}
              {/* Stronger shadow */}
              <filter id="shadow3d" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="8"/>
                <feOffset dx="0" dy="12" result="offsetblur"/>
                <feComponentTransfer>
                  <feFuncA type="linear" slope="0.25"/>
                </feComponentTransfer>
                <feMerge>
                  <feMergeNode/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Main pie chart - HUGE */}
            <Pie
              data={spendingByCategory}
              cx="50%"
              cy="50%"
              innerRadius={0}
              outerRadius="82%"
              paddingAngle={3}
              labelLine={true}
              label={renderCustomizedLabel}
              fill="#8884d8"
              dataKey="value"
              isAnimationActive={false}
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
              style={{ 
                filter: 'url(#shadow3d)', 
                cursor: 'pointer',
              }}
            >
              {spendingByCategory.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={`url(#gradient-${index})`}
                  stroke="#ffffff"
                  strokeWidth={activeIndex === index ? 6 : 4}
                  style={{
                    transform: activeIndex === index ? 'scale(1.05)' : 'scale(1)',
                    transformOrigin: 'center',
                    transition: 'all 0.3s ease',
                  }}
                />
              ))}
            </Pie>

            <Tooltip content={renderStyledPieTooltip} wrapperStyle={{ outline: 'none' }} cursor={{ fill: 'rgba(59, 130, 246, 0.08)' }} />
            </PieChart>
          </div>
        ) : (
          <div className="w-full h-full min-h-[220px]" />
        )}
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
              <div className="bg-purple-50/50 rounded-lg sm:rounded-2xl p-2 sm:p-4 border border-purple-100 flex justify-center h-64 min-w-0 min-h-[220px]">
                <PieChart width={220} height={220}>
                    <Pie
                      data={spendingByCategory}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
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
                          style={{
                            filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))'
                          }}
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
