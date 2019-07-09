const jestConfig = {
    verbose: true,
    notify: true,
    testRegex: '\\.test\\.js$',
    testEnvironment: 'node',
    transformIgnorePatterns: ['node_modules'],
    moduleFileExtensions: ['js'],
    moduleDirectories: [
        './node_modules',
        './src',
    ],
    collectCoverage: true,
    collectCoverageFrom: [
        'src/server/services/**/*.js',
        'src/server/routes/**/*.js',
    ],
    coverageThreshold: {
        global: {
            lines: 1,
        },
    },
    coverageDirectory: 'reports/coverage',
    setupFiles: [],
};
module.exports = jestConfig;
