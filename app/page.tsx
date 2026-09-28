"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { useTheme } from "@/components/ThemeContext";
import {
  ShoppingCart,
  Users,
  TrendingUp,
  TrendingDown,
  DollarSign,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const statsData = [
  { title: "Total Orders", value: "9,754", change: "+12.5%", isUp: true, icon: ShoppingCart },
  { title: "Revenue", value: "$75.21K", change: "+8.2%", isUp: true, icon: DollarSign },
  { title: "Customers", value: "2,345", change: "+5.1%", isUp: true, icon: Users },
  { title: "Growth", value: "+25.08%", change: "-2.3%", isUp: false, icon: TrendingUp },
];

const revenueData = [
  { name: "Jan", revenue: 4000, orders: 2400 },
  { name: "Feb", revenue: 3000, orders: 1398 },
  { name: "Mar", revenue: 5000, orders: 3800 },
  { name: "Apr", revenue: 4500, orders: 3908 },
  { name: "May", revenue: 6000, orders: 4800 },
  { name: "Jun", revenue: 5500, orders: 3800 },
  { name: "Jul", revenue: 7000, orders: 4300 },
];

const categoryData = [
  { name: "Electronics", value: 45, color: "#7C3AED" },
  { name: "Fashion", value: 25, color: "#06B6D4" },
  { name: "Groceries", value: 20, color: "#10B981" },
  { name: "Others", value: 10, color: "#F59E0B" },
];

const recentOrders = [
  { id: "#ORD-001", customer: "Ahmed Ali", product: "iPhone 15", amount: "$1,200", status: "Completed" },
  { id: "#ORD-002", customer: "Sarah Smith", product: "MacBook Pro", amount: "$2,500", status: "Pending" },
  { id: "#ORD-003", customer: "Mohammad Hassan", product: "AirPods Pro", amount: "$250", status: "Completed" },
  { id: "#ORD-004", customer: "Layla Ahmad", product: "iPad Air", amount: "$800", status: "Processing" },
  { id: "#ORD-005", customer: "Omar Khaled", product: "Apple Watch", amount: "$450", status: "Completed" },
];

export default function Dashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, darkMode } = useTheme();

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} flex flex-col md:flex-row transition-colors duration-300`}>
      <Sidebar mobileOpen={mobileMenuOpen} setMobileOpen={setMobileMenuOpen} />

      <div className="flex-1 flex flex-col min-w-0 w-full">
        <Header onMenuClick={() => setMobileMenuOpen(true)} />

        <main className="flex-1 p-4 md:p-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full"
          >
            <h1 className="text-2xl md:text-3xl font-bold mb-1">Dashboard</h1>
            <p className={`${theme.textSecondary} mb-6 md:mb-8`}>Welcome back, Mahdi! 👋</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
              {statsData.map((stat, i) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  whileHover={{ y: -5 }}
                  className={`${theme.card} p-5 md:p-6 rounded-2xl border ${theme.border} hover:border-violet-500/50 transition-colors`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-violet-500/20">
                      <stat.icon className="text-violet-400" size={24} />
                    </div>
                    <span className={`text-sm font-semibold flex items-center gap-1 ${
                      stat.isUp ? "text-emerald-400" : "text-red-400"
                    }`}>
                      {stat.isUp ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                      {stat.change}
                    </span>
                  </div>
                  <p className={`${theme.textSecondary} text-sm mb-1`}>{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className={`lg:col-span-2 ${theme.card} p-4 md:p-6 rounded-2xl border ${theme.border}`}
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-bold">Revenue Overview</h2>
                    <p className={`text-sm ${theme.textSecondary}`}>Last 7 months</p>
                  </div>
                </div>
                <div className="w-full overflow-hidden">
                  <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={revenueData}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#334155" : "#E5E7EB"} />
                      <XAxis dataKey="name" stroke={darkMode ? "#94A3B8" : "#6B7280"} />
                      <YAxis stroke={darkMode ? "#94A3B8" : "#6B7280"} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: darkMode ? "#1E293B" : "#FFFFFF",
                          border: `1px solid ${darkMode ? "#334155" : "#E5E7EB"}`,
                          borderRadius: "12px",
                        }}
                      />
                      <Area type="monotone" dataKey="revenue" stroke="#7C3AED" fillOpacity={1} fill="url(#colorRevenue)" />
                      <Area type="monotone" dataKey="orders" stroke="#06B6D4" fillOpacity={1} fill="url(#colorOrders)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className={`${theme.card} p-4 md:p-6 rounded-2xl border ${theme.border}`}
              >
                <h2 className="text-lg font-bold mb-2">Sales by Category</h2>
                <p className={`text-sm ${theme.textSecondary} mb-6`}>Distribution</p>
                <div className="w-full overflow-hidden">
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: darkMode ? "#1E293B" : "#FFFFFF",
                          border: `1px solid ${darkMode ? "#334155" : "#E5E7EB"}`,
                          borderRadius: "12px",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2 mt-4">
                  {categoryData.map((cat) => (
                    <div key={cat.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }}></span>
                        <span className={theme.textSecondary}>{cat.name}</span>
                      </div>
                      <span className="font-semibold">{cat.value}%</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className={`${theme.card} rounded-2xl border ${theme.border} overflow-hidden w-full`}
            >
              <div className={`p-4 md:p-6 border-b ${theme.border} flex items-center justify-between`}>
                <div>
                  <h2 className="text-lg font-bold">Recent Orders</h2>
                  <p className={`text-sm ${theme.textSecondary}`}>Latest transactions</p>
                </div>
              </div>
              <div className="overflow-x-auto w-full">
                <table className="w-full min-w-[600px]">
                  <thead className={theme.tableHead}>
                    <tr>
                      <th className={`text-left px-4 md:px-6 py-4 text-xs font-semibold ${theme.textSecondary} uppercase`}>Order ID</th>
                      <th className={`text-left px-4 md:px-6 py-4 text-xs font-semibold ${theme.textSecondary} uppercase`}>Customer</th>
                      <th className={`text-left px-4 md:px-6 py-4 text-xs font-semibold ${theme.textSecondary} uppercase`}>Product</th>
                      <th className={`text-left px-4 md:px-6 py-4 text-xs font-semibold ${theme.textSecondary} uppercase`}>Amount</th>
                      <th className={`text-left px-4 md:px-6 py-4 text-xs font-semibold ${theme.textSecondary} uppercase`}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className={`border-b ${theme.border} last:border-0`}>
                        <td className="px-4 md:px-6 py-4 text-sm font-medium text-violet-400">{order.id}</td>
                        <td className="px-4 md:px-6 py-4 text-sm">{order.customer}</td>
                        <td className={`px-4 md:px-6 py-4 text-sm ${theme.textSecondary}`}>{order.product}</td>
                        <td className="px-4 md:px-6 py-4 text-sm font-semibold">{order.amount}</td>
                        <td className="px-4 md:px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              order.status === "Completed"
                                ? "bg-emerald-500/20 text-emerald-400"
                                : order.status === "Pending"
                                ? "bg-amber-500/20 text-amber-400"
                                : "bg-cyan-500/20 text-cyan-400"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}