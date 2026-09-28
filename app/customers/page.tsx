"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { useTheme } from "@/components/ThemeContext";
import { Plus, Search, Mail, Phone, MapPin, MoreVertical } from "lucide-react";

const customers = [
  { id: 1, name: "Ahmed Ali", email: "ahmed@example.com", phone: "+961 70 123 456", location: "Beirut, LB", orders: 12, spent: "$4,500", avatar: "A", color: "from-violet-500 to-purple-500" },
  { id: 2, name: "Sarah Smith", email: "sarah@example.com", phone: "+961 71 234 567", location: "Dubai, UAE", orders: 8, spent: "$2,800", avatar: "S", color: "from-cyan-500 to-blue-500" },
  { id: 3, name: "Mohammad Hassan", email: "mohammad@example.com", phone: "+961 76 345 678", location: "Tripoli, LB", orders: 15, spent: "$6,200", avatar: "M", color: "from-emerald-500 to-green-500" },
  { id: 4, name: "Layla Ahmad", email: "layla@example.com", phone: "+961 78 456 789", location: "Saida, LB", orders: 5, spent: "$1,200", avatar: "L", color: "from-amber-500 to-orange-500" },
  { id: 5, name: "Omar Khaled", email: "omar@example.com", phone: "+961 79 567 890", location: "Beirut, LB", orders: 20, spent: "$8,900", avatar: "O", color: "from-pink-500 to-rose-500" },
  { id: 6, name: "Nour Ibrahim", email: "nour@example.com", phone: "+961 70 678 901", location: "Jounieh, LB", orders: 3, spent: "$750", avatar: "N", color: "from-indigo-500 to-violet-500" },
];

export default function CustomersPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { theme } = useTheme();

  const filteredCustomers = customers.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                <h1 className="text-2xl md:text-3xl font-bold mb-1">Customers</h1>
                <p className={`${theme.textSecondary}`}>Manage your customer base</p>
              </div>
              <button className="bg-gradient-to-r from-violet-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 justify-center">
                <Plus size={18} />
                Add Customer
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { label: "Total Customers", value: customers.length, color: "text-violet-400" },
                { label: "Active", value: customers.filter(c => c.orders > 5).length, color: "text-emerald-400" },
                { label: "New", value: customers.filter(c => c.orders <= 5).length, color: "text-cyan-400" },
                { label: "Total Revenue", value: "$24.3K", color: "text-amber-400" },
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

            {/* Search */}
            <div className={`${theme.card} p-4 rounded-2xl border ${theme.border} mb-6`}>
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 -translate-y-1/2 ${theme.textSecondary}`} size={18} />
                <input
                  type="text"
                  placeholder="Search customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full ${theme.input} border ${theme.border} rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-violet-500 transition-colors`}
                />
              </div>
            </div>

            {/* Customers List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredCustomers.map((customer, i) => (
                <motion.div
                  key={customer.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  whileHover={{ y: -5 }}
                  className={`${theme.card} p-5 rounded-2xl border ${theme.border} hover:border-violet-500/50 transition-all`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${customer.color} flex items-center justify-center text-white font-bold text-xl`}>
                      {customer.avatar}
                    </div>
                    <button className={`p-1 rounded-lg hover:bg-violet-500/20 ${theme.textSecondary} transition-colors`}>
                      <MoreVertical size={18} />
                    </button>
                  </div>

                  <h3 className="font-bold text-lg mb-1">{customer.name}</h3>
                  <p className={`text-xs ${theme.textSecondary} mb-4`}>{customer.location}</p>

                  <div className="space-y-2 mb-4">
                    <div className={`flex items-center gap-2 text-sm ${theme.textSecondary}`}>
                      <Mail size={14} />
                      <span className="truncate">{customer.email}</span>
                    </div>
                    <div className={`flex items-center gap-2 text-sm ${theme.textSecondary}`}>
                      <Phone size={14} />
                      <span>{customer.phone}</span>
                    </div>
                  </div>

                  <div className={`pt-4 border-t ${theme.border} flex items-center justify-between`}>
                    <div>
                      <p className={`text-xs ${theme.textSecondary}`}>Orders</p>
                      <p className="font-bold text-violet-400">{customer.orders}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-xs ${theme.textSecondary}`}>Spent</p>
                      <p className="font-bold text-emerald-400">{customer.spent}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}