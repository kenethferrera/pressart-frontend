import React, { useState, useEffect } from 'react';
import { performanceMonitor } from '../utils/performance';

// Safety check for performanceMonitor
const safePerformanceMonitor = performanceMonitor || {
  getMetrics: () => ({ imageLoadTimes: [], errors: [] }),
  clearMetrics: () => {},
  logImageLoadTime: () => {},
  logPageLoadTime: () => {},
  logError: () => {},
  logSummary: () => console.log('Performance summary not available')
};

const PerformanceDashboard = () => {
  const [metrics, setMetrics] = useState({
    imageLoads: 0,
    failedLoads: 0,
    totalLoadTime: 0,
    averageLoadTime: 0,
    memoryUsage: 0
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== 'development') return;

    const updateMetrics = () => {
      try {
        const rawMetrics = safePerformanceMonitor.getMetrics();
        
        // Transform the metrics to match expected format
        const imageLoads = rawMetrics.imageLoadTimes.length;
        const failedLoads = rawMetrics.errors.filter(error => error.context === 'image').length;
        const totalLoadTime = rawMetrics.imageLoadTimes.reduce((sum, item) => sum + item.loadTime, 0);
        const averageLoadTime = imageLoads > 0 ? totalLoadTime / imageLoads : 0;
        
        setMetrics({
          imageLoads,
          failedLoads,
          totalLoadTime,
          averageLoadTime,
          memoryUsage: performance.memory ? performance.memory.usedJSHeapSize : 0
        });
      } catch (error) {
        console.error('Error updating performance metrics:', error);
        // Set default metrics if there's an error
        setMetrics({
          imageLoads: 0,
          failedLoads: 0,
          totalLoadTime: 0,
          averageLoadTime: 0,
          memoryUsage: 0
        });
      }
    };

    // Update metrics every 2 seconds
    const interval = setInterval(updateMetrics, 2000);
    updateMetrics(); // Initial update

    return () => clearInterval(interval);
  }, []);

  // Don't render in production
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const formatMemory = (bytes) => {
    return (bytes / 1024 / 1024).toFixed(2);
  };

  const formatTime = (ms) => {
    return ms.toFixed(2);
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg transition-colors"
        title="Performance Dashboard"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      </button>

      {isVisible && (
        <div className="absolute bottom-14 left-0 bg-white border border-gray-200 rounded-lg shadow-xl p-4 min-w-64">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800">Performance</h3>
            <button
              onClick={() => safePerformanceMonitor.clearMetrics()}
              className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded"
            >
              Reset
            </button>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Images Loaded:</span>
              <span className="font-medium text-green-600">{metrics.imageLoads}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Failed Loads:</span>
              <span className="font-medium text-red-600">{metrics.failedLoads}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Avg Load Time:</span>
              <span className="font-medium">{formatTime(metrics.averageLoadTime)}ms</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Memory Usage:</span>
              <span className="font-medium">{formatMemory(metrics.memoryUsage)}MB</span>
            </div>
            
            <div className="pt-2 border-t">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Success Rate:</span>
                <span>
                  {metrics.imageLoads + metrics.failedLoads > 0
                    ? ((metrics.imageLoads / (metrics.imageLoads + metrics.failedLoads)) * 100).toFixed(1)
                    : 0
                  }%
                </span>
              </div>
            </div>
          </div>
          
                     <button
             onClick={() => console.log('Performance Metrics:', safePerformanceMonitor.getMetrics())}
             className="w-full mt-3 text-xs bg-blue-50 hover:bg-blue-100 text-blue-600 py-1 rounded"
           >
             Log Summary
           </button>
        </div>
      )}
    </div>
  );
};

export default PerformanceDashboard;


