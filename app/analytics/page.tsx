"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { useTheme } from "@/components/ThemeContext";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  Clock,
  MousePointerClick,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

const trafficData = [
  { name: "Mon", visitors: 1200, pageViews: 3400 },
  { name: "Tue", visitors: 1900, pageViews: 4200 },
  { name: "Wed", visitors: 2400, pageViews: 5100 },
  { name: "Thu", visitors: 1800, pageViews: 3900 },
  { name: "Fri", visitors: 2800, pageViews: 6200 },
  { name: "Sat", visitors: 3200, pageViews: 7100 },
  { name: "Sun", visitors: 2600, pageViews: 5800 },
];

const deviceData = [
  { name: "Desktop", value: 4500 },
  { name: "Mobile", value: 3800 },
  { name: "Tablet", value: 1200 },
];

const performanceData = [
  { subject: "Speed", A: 95, fullMark: 100 },
  { subject: "SEO", A: 88, fullMark: 100 },
  { subject: "UX", A: 92, fullMark: 100 },
  { subject: "Accessibility", A: 78, fullMark: 100 },
  { subject: "Best Practices", A: 90, fullMark: 100 },
];

export default function AnalyticsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, darkMode } = useTheme();

  const stats = [
    { title: "Total Visitors", value: "15,432", change: "+18.2%", isUp: true, icon: Users, color: "violet" },
    { title: "Page Views", value: "37,820", change: "+12.5%", isUp: true, icon: Eye, color: "cyan" },
    { title: "Avg. Session", value: "3m 24s", change: "+8.1%", isUp: true, icon: Clock, color: "emerald" },
    { title: "Bounce Rate", value: "32.4%", change: "-4.3%", isUp: false, icon: MousePointerClick, color: "amber" },
  ];

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
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold mb-1">Analytics</h1>
              <p className={theme.textSecondary}>Track your performance metrics</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
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

            {/* Traffic Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className={`lg:col-span-2 ${theme.card} p-4 md:p-6 rounded-2xl border ${theme.border}`}
              >
                <h2 className="text-lg font-bold mb-1">Traffic Overview</h2>
                <p className={`text-sm ${theme.textSecondary} mb-6`}>Weekly visitors & page views</p>
                <div className="w-full overflow-hidden">
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={trafficData}>
                      <defs>
                        <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
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
                      <Area type="monotone" dataKey="visitors" stroke="#7C3AED" fillOpacity={1} fill="url(#colorVisitors)" />
                      <Area type="monotone" dataKey="pageViews" stroke="#06B6D4" fillOpacity={1} fill="url(#colorViews)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className={`${theme.card} p-4 md:p-6 rounded-2xl border ${theme.border}`}
              >
                <h2 className="text-lg font-bold mb-1">Devices</h2>
                <p className={`text-sm ${theme.textSecondary} mb-6`}>Traffic by device</p>
                <div className="w-full overflow-hidden">
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={deviceData}>
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
                      <Bar dataKey="value" fill="#7C3AED" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            </div>

            {/* Performance Radar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className={`${theme.card} p-4 md:p-6 rounded-2xl border ${theme.border}`}
            >
              <h2 className="text-lg font-bold mb-1">Website Performance</h2>
              <p className={`text-sm ${theme.textSecondary} mb-6`}>Core Web Vitals</p>
              <div className="w-full overflow-hidden">
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={performanceData}>
                    <PolarGrid stroke={darkMode ? "#334155" : "#E5E7EB"} />
                    <PolarAngleAxis dataKey="subject" stroke={darkMode ? "#94A3B8" : "#6B7280"} />
                    <PolarRadiusAxis stroke={darkMode ? "#94A3B8" : "#6B7280"} />
                    <Radar name="Performance" dataKey="A" stroke="#7C3AED" fill="#7C3AED" fillOpacity={0.5} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: darkMode ? "#1E293B" : "#FFFFFF",
                        border: `1px solid ${darkMode ? "#334155" : "#E5E7EB"}`,
                        borderRadius: "12px",
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}