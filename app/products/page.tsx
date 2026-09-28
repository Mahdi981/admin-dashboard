"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { useTheme } from "@/components/ThemeContext";
import { Plus, Search, Edit, Trash2, Star } from "lucide-react";

const products = [
  { id: 1, name: "iPhone 15 Pro", category: "Electronics", price: "$1,200", stock: 45, rating: 4.8, image: "📱" },
  { id: 2, name: "MacBook Pro M3", category: "Electronics", price: "$2,500", stock: 12, rating: 4.9, image: "💻" },
  { id: 3, name: "AirPods Pro", category: "Electronics", price: "$250", stock: 78, rating: 4.7, image: "🎧" },
  { id: 4, name: "iPad Air", category: "Electronics", price: "$800", stock: 34, rating: 4.6, image: "📱" },
  { id: 5, name: "Apple Watch", category: "Wearables", price: "$450", stock: 56, rating: 4.8, image: "⌚" },
  { id: 6, name: "Samsung S24", category: "Electronics", price: "$900", stock: 23, rating: 4.5, image: "📱" },
  { id: 7, name: "Dell XPS 15", category: "Electronics", price: "$1,800", stock: 8, rating: 4.7, image: "💻" },
  { id: 8, name: "Sony Headphones", category: "Audio", price: "$350", stock: 42, rating: 4.6, image: "🎧" },
];

export default function ProductsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { theme } = useTheme();

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
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
                <h1 className="text-2xl md:text-3xl font-bold mb-1">Products</h1>
                <p className={`${theme.textSecondary}`}>Manage your product inventory</p>
              </div>
              <button className="bg-gradient-to-r from-violet-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 justify-center">
                <Plus size={18} />
                Add Product
              </button>
            </div>

            {/* Search */}
            <div className={`${theme.card} p-4 rounded-2xl border ${theme.border} mb-6`}>
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 -translate-y-1/2 ${theme.textSecondary}`} size={18} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full ${theme.input} border ${theme.border} rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-violet-500 transition-colors`}
                />
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {filteredProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  whileHover={{ y: -5 }}
                  className={`${theme.card} rounded-2xl border ${theme.border} overflow-hidden hover:border-violet-500/50 transition-all group`}
                >
                  <div className="h-40 bg-gradient-to-br from-violet-500/20 to-cyan-500/20 flex items-center justify-center text-6xl">
                    {product.image}
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <span className={`text-xs font-semibold ${theme.textSecondary} uppercase`}>
                        {product.category}
                      </span>
                      <div className="flex items-center gap-1 text-amber-400 text-xs font-semibold">
                        <Star size={12} fill="currentColor" />
                        {product.rating}
                      </div>
                    </div>
                    <h3 className="font-bold text-lg mb-3">{product.name}</h3>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xl font-bold text-violet-400">{product.price}</span>
                      <span className={`text-xs ${theme.textSecondary}`}>Stock: {product.stock}</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 bg-violet-500/20 text-violet-400 py-2 rounded-lg text-sm font-semibold hover:bg-violet-500/30 transition-colors flex items-center justify-center gap-1">
                        <Edit size={14} />
                        Edit
                      </button>
                      <button className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors">
                        <Trash2 size={16} />
                      </button>
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