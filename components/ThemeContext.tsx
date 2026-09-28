"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type ThemeContextType = {
  darkMode: boolean;
  toggleTheme: () => void;
  theme: {
    bg: string;
    card: string;
    border: string;
    text: string;
    textSecondary: string;
    headerBg: string;
    tableHead: string;
    input: string;
  };
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved !== null) setDarkMode(saved === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  const theme = darkMode
    ? {
        bg: "bg-[#0F172A]",
        card: "bg-[#1E293B]",
        border: "border-[#334155]",
        text: "text-white",
        textSecondary: "text-gray-400",
        headerBg: "bg-[#1E293B]",
        tableHead: "bg-[#0F172A]",
        input: "bg-[#0F172A]",
      }
    : {
        bg: "bg-gray-50",
        card: "bg-white",
        border: "border-gray-200",
        text: "text-gray-900",
        textSecondary: "text-gray-500",
        headerBg: "bg-white",
        tableHead: "bg-gray-100",
        input: "bg-gray-100",
      };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}