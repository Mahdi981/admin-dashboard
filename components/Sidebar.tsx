"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  BarChart3,
  ShoppingCart,
  Package,
  Users,
  Settings,
  X,
} from "lucide-react";
import { useTheme } from "./ThemeContext";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/" },
  { name: "Analytics", icon: BarChart3, href: "/analytics" },
  { name: "Orders", icon: ShoppingCart, href: "/orders" },
  { name: "Products", icon: Package, href: "/products" },
  { name: "Customers", icon: Users, href: "/customers" },
];

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export function Sidebar({ mobileOpen, setMobileOpen }: SidebarProps) {
  const pathname = usePathname();
  const { theme } = useTheme();

  const NavContent = () => (
    <>
      <div className={`p-6 border-b ${theme.border}`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-xl flex items-center justify-center font-bold text-lg text-white">
            A
          </div>
          <h1 className="text-xl font-bold">AdminPanel</h1>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href}>
              <motion.div
                whileHover={{ x: 5 }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-violet-500/20 to-cyan-500/10 text-violet-400 border border-violet-500/30"
                    : `${theme.textSecondary} hover:bg-violet-500/10 hover:text-violet-400`
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.name}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      <div className={`p-4 border-t ${theme.border}`}>
        <motion.div
          whileHover={{ x: 5 }}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl ${theme.textSecondary} hover:bg-violet-500/10 hover:text-violet-400 transition-colors cursor-pointer`}
        >
          <Settings size={20} />
          <span className="font-medium">Settings</span>
        </motion.div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.3 }}
              className={`fixed left-0 top-0 bottom-0 w-64 ${theme.card} border-r ${theme.border} z-50 md:hidden flex flex-col`}
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 z-10"
              >
                <X size={24} />
              </button>
              <NavContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`w-64 ${theme.card} border-r ${theme.border} hidden md:flex flex-col flex-shrink-0 transition-colors duration-300`}
      >
        <NavContent />
      </motion.aside>
    </>
  );
}