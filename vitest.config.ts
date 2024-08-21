// Copyright © 2024 Navarrotech.

import { defineConfig } from 'vitest/config'

// For more information regarding this configuration:
// https://vitest.dev/config/

export default defineConfig({
  test: {
    // Reporting:
    reporters: [
      'junit'
    ],
    outputFile: {
      junit: './test/test-results.xml'
    },
    passWithNoTests: true,

    // Coverage (V8)
    coverage: {
      reporter: [
        'text-summary'
      ],
      reportsDirectory: './test/coverage',
      provider: 'v8'
    },

    // Typescript
    typecheck: {
      enabled: true
    },

    // React.js:
    globals: true,
    environment: 'happy-dom',

    // Circle CI:
    minWorkers: 2,
    maxWorkers: 3,
    logHeapUsage: true,

    // Debugging:
    onStackTrace(error, { file }): boolean | void {
      // If we've encountered a ReferenceError, show the whole stack.
      if (error.name === 'ReferenceError') {
        return
      }

      // Reject all frames from third party libraries.
      if (file.includes('node_modules')) {
        return false
      }
    }
  }
})
