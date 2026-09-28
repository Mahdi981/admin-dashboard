"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { useTheme } from "@/components/ThemeContext";
import { Search, Filter, Eye, Download } from "lucide-react";

const allOrders = [
  { id: "#ORD-001", customer: "Ahmed Ali", product: "iPhone 15", amount: "$1,200", status: "Completed", date: "2026-09-27" },
  { id: "#ORD-002", customer: "Sarah Smith", product: "MacBook Pro", amount: "$2,500", status: "Pending", date: "2026-09-27" },
  { id: "#ORD-003", customer: "Mohammad Hassan", product: "AirPods Pro", amount: "$250", status: "Completed", date: "2026-09-26" },
  { id: "#ORD-004", customer: "Layla Ahmad", product: "iPad Air", amount: "$800", status: "Processing", date: "2026-09-26" },
  { id: "#ORD-005", customer: "Omar Khaled", product: "Apple Watch", amount: "$450", status: "Completed", date: "2026-09-25" },
  { id: "#ORD-006", customer: "Nour Ibrahim", product: "Samsung S24", amount: "$900", status: "Pending", date: "2026-09-25" },
  { id: "#ORD-007", customer: "Hassan Ali", product: "Dell XPS 15", amount: "$1,800", status: "Completed", date: "2026-09-24" },
  { id: "#ORD-008", customer: "Rana Saleh", product: "Sony Headphones", amount: "$350", status: "Processing", date: "2026-09-24" },
];

export default function OrdersPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const { theme } = useTheme();

  const filteredOrders = allOrders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "All" || order.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} flex flex-col md:flex-row transition-colors duration-300`}>
      <Sidebar mobileOpen={mobileMenuOpen} setMobileOpen={setMobileMenuOpen} />

      <div className="flex-1 flex flex-col min-w-0 w-full">
        <Header onMenuClick={() => setMobileMenuOpen(true)} />

        <main className="flex-1 p-4 md:p-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-1">Orders</h1>
                <p className={`${theme.textSecondary}`}>Manage all customer orders</p>
              </div>
              <button className="bg-gradient-to-r from-violet-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 justify-center">
                <Download size={18} />
                Export CSV
              </button>
            </div>

            {/* Filters */}
            <div className={`${theme.card} p-4 rounded-2xl border ${theme.border} mb-6 flex flex-col md:flex-row gap-4`}>
              <div className="relative flex-1">
                <Search className={`absolute left-3 top-1/2 -translate-y-1/2 ${theme.textSecondary}`} size={18} />
                <input
                  type="text"
                  placeholder="Search by customer or order ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full ${theme.input} border ${theme.border} rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-violet-500 transition-colors`}
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter size={18} className={theme.textSecondary} />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className={`${theme.input} border ${theme.border} rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-violet-500 transition-colors`}
                >
                  <option>All</option>
                  <option>Completed</option>
                  <option>Pending</option>
                  <option>Processing</option>
                </select>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { label: "Total", value: allOrders.length, color: "text-violet-400" },
                { label: "Completed", value: allOrders.filter(o => o.status === "Completed").length, color: "text-emerald-400" },
                { label: "Pending", value: allOrders.filter(o => o.status === "Pending").length, color: "text-amber-400" },
                { label: "Processing", value: allOrders.filter(o => o.status === "Processing").length, color: "text-cyan-400" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`${theme.card} p-4 rounded-2xl border ${theme.border}`}
                >
                  <p className={`text-sm ${theme.textSecondary} mb-1`}>{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                </motion.div>
              ))}
            </div>

            {/* Table */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={`${theme.card} rounded-2xl border ${theme.border} overflow-hidden w-full`}
            >
              <div className="overflow-x-auto w-full">
                <table className="w-full min-w-[800px]">
                  <thead className={theme.tableHead}>
                    <tr>
                      <th className={`text-left px-6 py-4 text-xs font-semibold ${theme.textSecondary} uppercase`}>Order ID</th>
                      <th className={`text-left px-6 py-4 text-xs font-semibold ${theme.textSecondary} uppercase`}>Customer</th>
                      <th className={`text-left px-6 py-4 text-xs font-semibold ${theme.textSecondary} uppercase`}>Product</th>
                      <th className={`text-left px-6 py-4 text-xs font-semibold ${theme.textSecondary} uppercase`}>Amount</th>
                      <th className={`text-left px-6 py-4 text-xs font-semibold ${theme.textSecondary} uppercase`}>Date</th>
                      <th className={`text-left px-6 py-4 text-xs font-semibold ${theme.textSecondary} uppercase`}>Status</th>
                      <th className={`text-left px-6 py-4 text-xs font-semibold ${theme.textSecondary} uppercase`}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className={`border-b ${theme.border} last:border-0 hover:bg-violet-500/5 transition-colors`}>
                        <td className="px-6 py-4 text-sm font-medium text-violet-400">{order.id}</td>
                        <td className="px-6 py-4 text-sm font-medium">{order.customer}</td>
                        <td className={`px-6 py-4 text-sm ${theme.textSecondary}`}>{order.product}</td>
                        <td className="px-6 py-4 text-sm font-semibold">{order.amount}</td>
                        <td className={`px-6 py-4 text-sm ${theme.textSecondary}`}>{order.date}</td>
                        <td className="px-6 py-4">
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
                        <td className="px-6 py-4">
                          <button className="p-2 rounded-lg hover:bg-violet-500/20 text-violet-400 transition-colors">
                            <Eye size={18} />
                          </button>
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