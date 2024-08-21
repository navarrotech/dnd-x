// Copyright © 2024 Navarrotech

// Vite will statically replace "import.meta.env" with the proper env variables when bundling
// For example, import.meta.env.NODE_ENV will be replaced with the string "production" when built.
// Thus we have to export each as a individual constant.

// We define environment variables here, for the following reasons:
// 1. Keep track of all possible environment variables defined in one place.
// 2. Have a backup system built into the JS code in case the environment variables are not defined.
// 3. Type safety, with ensuring typescript knows what the environment variables are.
// 4. If a critical variable doesn't exist, we can put if checks in this file to throw an error.
// 5. If a variable must be cast to a number or boolean, we can do that here.
// 6. If the name changes, we update the name in one place, and it updates everywhere correctly.

export const NODE_ENV = import.meta.env.NODE_ENV || 'development'

console.log('Running in ' + NODE_ENV + ' mode')
