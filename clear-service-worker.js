console.log('🧹 Clearing Service Worker Cache');
console.log('================================');

// Function to clear all caches
async function clearAllCaches() {
  try {
    const cacheNames = await caches.keys();
    console.log('Found caches:', cacheNames);
    
    for (const cacheName of cacheNames) {
      await caches.delete(cacheName);
      console.log('✅ Deleted cache:', cacheName);
    }
    
    console.log('🎉 All caches cleared successfully!');
  } catch (error) {
    console.error('❌ Error clearing caches:', error);
  }
}

// Function to unregister service worker
async function unregisterServiceWorker() {
  try {
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      console.log('Found service worker registrations:', registrations.length);
      
      for (const registration of registrations) {
        await registration.unregister();
        console.log('✅ Unregistered service worker:', registration.scope);
      }
      
      console.log('🎉 All service workers unregistered!');
    } else {
      console.log('ℹ️  Service Worker not supported in this browser');
    }
  } catch (error) {
    console.error('❌ Error unregistering service worker:', error);
  }
}

// Function to clear browser cache
function clearBrowserCache() {
  console.log('💡 To clear browser cache:');
  console.log('1. Open Developer Tools (F12)');
  console.log('2. Right-click the refresh button');
  console.log('3. Select "Empty Cache and Hard Reload"');
  console.log('4. Or press Ctrl+Shift+R (Cmd+Shift+R on Mac)');
}

// Run all cleanup functions
async function cleanup() {
  console.log('\n🔄 Starting cleanup process...\n');
  
  await clearAllCaches();
  await unregisterServiceWorker();
  
  console.log('\n📋 Manual Steps:');
  clearBrowserCache();
  
  console.log('\n✅ Cleanup complete! Now:');
  console.log('1. Refresh the page (Ctrl+R)');
  console.log('2. The images should load properly');
  console.log('3. If still having issues, try "Empty Cache and Hard Reload"');
}

// Run cleanup if this script is executed in browser
if (typeof window !== 'undefined') {
  cleanup();
} else {
  console.log('📝 This script should be run in the browser console.');
  console.log('💡 Copy and paste this into your browser console:');
  console.log('fetch("/clear-service-worker.js").then(r => r.text()).then(eval);');
}
