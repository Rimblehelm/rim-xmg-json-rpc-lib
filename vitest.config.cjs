module.exports = {
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./tests/setupTests.ts'],
    include: ['tests/**/*.test.ts'],
    coverage: {
      provider: 'c8',
      reporter: ['lcov', 'html', 'text', 'json'],
      reportsDirectory: 'coverage',
    },
  },
};
