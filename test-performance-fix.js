// Test script to verify performanceMonitor fix
console.log('🧪 Testing PerformanceMonitor Fix');
console.log('================================');

// Test the performanceMonitor import
try {
  const { performanceMonitor } = require('./src/utils/performance');
  console.log('✅ performanceMonitor imported successfully');
  console.log('📊 performanceMonitor type:', typeof performanceMonitor);
  
  // Test getMetrics method
  const metrics = performanceMonitor.getMetrics();
  console.log('✅ getMetrics() works:', metrics);
  
  // Test clearMetrics method
  performanceMonitor.clearMetrics();
  console.log('✅ clearMetrics() works');
  
  // Test logImageLoadTime method
  performanceMonitor.logImageLoadTime('test-image.jpg', 150);
  console.log('✅ logImageLoadTime() works');
  
  console.log('\n🎉 All performanceMonitor methods working correctly!');
  
} catch (error) {
  console.error('❌ Error testing performanceMonitor:', error.message);
}

console.log('\n🚀 Ready to start development server!');
console.log('Run: npm start');
