import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg transform transition-all duration-500 hover:scale-110 group z-50"
      aria-label="Toggle theme"
    >
      <div className="relative w-6 h-6">
        <Sun className="w-6 h-6 text-yellow-500 absolute transition-all duration-500 rotate-0 scale-100 dark:rotate-90 dark:scale-0" />
        <Moon className="w-6 h-6 text-blue-500 absolute transition-all duration-500 -rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
      </div>
      <span className="absolute right-full mr-2 py-1 px-2 bg-white dark:bg-gray-800 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-lg">
        Toggle {isDark ? 'light' : 'dark'} mode
      </span>
    </button>
  );
}