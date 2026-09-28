"use client";

import { motion } from "framer-motion";
import { Bell, Search, Sun, Moon, Menu } from "lucide-react";
import { useTheme } from "./ThemeContext";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { theme, darkMode, toggleTheme } = useTheme();

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`${theme.headerBg} border-b ${theme.border} px-6 py-4 flex items-center justify-between sticky top-0 z-30 transition-colors duration-300`}
    >
      <div className="flex items-center gap-4 flex-1 ml-12 md:ml-0">
        <button
          onClick={onMenuClick}
          className={`md:hidden p-2 ${theme.card} border ${theme.border} rounded-xl`}
        >
          <Menu size={20} />
        </button>
        <div className="relative w-full max-w-md hidden sm:block">
          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 ${theme.textSecondary}`} size={18} />
          <input
            type="text"
            placeholder="Search..."
            className={`w-full ${theme.input} border ${theme.border} rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-violet-500 transition-colors`}
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className={`relative p-2 rounded-xl ${theme.input} border ${theme.border} hover:border-violet-500 transition-colors`}
        >
          {darkMode ? (
            <Sun size={20} className="text-yellow-400" />
          ) : (
            <Moon size={20} className="text-violet-600" />
          )}
        </button>

        <button
          className={`relative p-2 rounded-xl ${theme.input} border ${theme.border} hover:border-violet-500 transition-colors`}
        >
          <Bell size={20} className={theme.textSecondary} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-full flex items-center justify-center font-bold text-white">
            M
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-semibold">Mahdi Alkara</p>
            <p className={`text-xs ${theme.textSecondary}`}>Admin</p>
          </div>
        </div>
      </div>
    </motion.header>
  );
}