const nextJest = require('next/jest');

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load 
    // `next.config.js` and `.env` files in your test environment
    dir: './'
});

// custom config
const customJestConfig = {
    moduleDirectories: ['node_modules'],
    testEnvironment: 'jest-environment-jsdom'
};

module.exports = createJestConfig(customJestConfig);