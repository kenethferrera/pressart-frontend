/**
 * Console filtering system to reduce noise during development
 * Filters out common warnings and logs while preserving important errors
 */

class ConsoleFilter {
  constructor() {
    this.originalMethods = {
      log: console.log,
      warn: console.warn,
      error: console.error,
      info: console.info
    };

    this.blockedKeywords = [
      'Warning: ReactDOM.render is deprecated',
      'Warning: findDOMNode is deprecated',
      'Download the React DevTools',
      'componentWillMount has been renamed',
      'componentWillReceiveProps has been renamed',
      'componentWillUpdate has been renamed',
      'validateDOMNesting',
      'unstable_',
      'react-hot-toast',
      'framer-motion warning'
    ];

    this.init();
  }

  init() {
    // Override console methods only in development
    if (process.env.NODE_ENV === 'development') {
      console.log = this.createFilteredMethod('log');
      console.warn = this.createFilteredMethod('warn');
      console.info = this.createFilteredMethod('info');
      // Keep error logging as is - errors are always important
      // console.error = this.createFilteredMethod('error');
    }
  }

  createFilteredMethod(methodName) {
    return (...args) => {
      const message = args.join(' ');
      
      // Check if message contains any blocked keywords
      const shouldBlock = this.blockedKeywords.some(keyword => 
        message.toLowerCase().includes(keyword.toLowerCase())
      );

      if (!shouldBlock) {
        this.originalMethods[methodName](...args);
      }
    };
  }

  // Add a keyword to the block list
  addBlockedKeyword(keyword) {
    if (!this.blockedKeywords.includes(keyword)) {
      this.blockedKeywords.push(keyword);
    }
  }

  // Remove a keyword from the block list
  removeBlockedKeyword(keyword) {
    const index = this.blockedKeywords.indexOf(keyword);
    if (index > -1) {
      this.blockedKeywords.splice(index, 1);
    }
  }

  // Temporarily disable filtering
  disable() {
    console.log = this.originalMethods.log;
    console.warn = this.originalMethods.warn;
    console.error = this.originalMethods.error;
    console.info = this.originalMethods.info;
  }

  // Re-enable filtering
  enable() {
    if (process.env.NODE_ENV === 'development') {
      console.log = this.createFilteredMethod('log');
      console.warn = this.createFilteredMethod('warn');
      console.info = this.createFilteredMethod('info');
    }
  }

  // Get current blocked keywords
  getBlockedKeywords() {
    return [...this.blockedKeywords];
  }

  // Force log a message (bypass filter)
  forceLog(...args) {
    this.originalMethods.log(...args);
  }

  // Force warn a message (bypass filter)
  forceWarn(...args) {
    this.originalMethods.warn(...args);
  }

  // Show filter status
  status() {
    this.forceLog('🔧 Console Filter Status:');
    this.forceLog(`   Enabled: ${process.env.NODE_ENV === 'development'}`);
    this.forceLog(`   Blocked keywords: ${this.blockedKeywords.length}`);
    this.forceLog(`   Keywords: ${this.blockedKeywords.join(', ')}`);
  }
}

// Create and export singleton instance
export const consoleFilter = new ConsoleFilter();

// Export utility functions
export const addConsoleFilter = (keyword) => {
  consoleFilter.addBlockedKeyword(keyword);
};

export const removeConsoleFilter = (keyword) => {
  consoleFilter.removeBlockedKeyword(keyword);
};

export const disableConsoleFilter = () => {
  consoleFilter.disable();
};

export const enableConsoleFilter = () => {
  consoleFilter.enable();
};

export const showConsoleFilterStatus = () => {
  consoleFilter.status();
};

// Initialize the filter
export default consoleFilter;



