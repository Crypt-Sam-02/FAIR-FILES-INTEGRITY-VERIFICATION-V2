import React from 'react';
import { FileCheck, AlertTriangle, Clock } from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';

interface StatsBarProps {
  totalFiles: number;
  maliciousFiles: number;
  lastScanTime: string | null;
}

export function StatsBar({ totalFiles, maliciousFiles, lastScanTime }: StatsBarProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-4 transform hover:scale-105 transition-all duration-300">
        <div className="flex items-center space-x-4">
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
            <FileCheck className="w-6 h-6 text-white animate-bounce-slow" />
          </div>
          <div className="text-white">
            <p className="text-sm opacity-90">Files Scanned</p>
            <p className="text-3xl font-bold">
              <AnimatedCounter value={totalFiles} />
            </p>
          </div>
        </div>
        <div className="mt-2 h-1 bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white/40 rounded-full animate-pulse-slow"
            style={{ width: `${Math.min(100, totalFiles * 10)}%` }}
          />
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg shadow-lg p-4 transform hover:scale-105 transition-all duration-300">
        <div className="flex items-center space-x-4">
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
            <AlertTriangle className="w-6 h-6 text-white animate-ping-slow" />
          </div>
          <div className="text-white">
            <p className="text-sm opacity-90">Suspicious Files</p>
            <p className="text-3xl font-bold">
              <AnimatedCounter value={maliciousFiles} />
            </p>
          </div>
        </div>
        <div className="mt-2 h-1 bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white/40 rounded-full animate-pulse-slow"
            style={{ width: `${Math.min(100, maliciousFiles * 20)}%` }}
          />
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg shadow-lg p-4 transform hover:scale-105 transition-all duration-300">
        <div className="flex items-center space-x-4">
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
            <Clock className="w-6 h-6 text-white animate-spin-slow" />
          </div>
          <div className="text-white">
            <p className="text-sm opacity-90">Last Scan</p>
            <p className="text-xl font-medium animate-pulse">
              {lastScanTime || 'No scans yet'}
            </p>
          </div>
        </div>
        <div className="mt-2 h-1 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-white/40 rounded-full animate-pulse-slow w-full" />
        </div>
      </div>
    </div>
  );
}