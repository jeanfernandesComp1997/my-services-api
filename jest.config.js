const { resolve } = require('path');
const root = resolve(__dirname);

module.exports = {
    rootDir: root,
    displayName: "my-services-api tests",
    testMatch: ["<rootDir>/__tests__/**/*.test.ts"],
    clearMocks: true,
    preset: 'ts-jest',
    testEnvironment: 'node'
};