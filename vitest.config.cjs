module.exports = {
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./tests/setupTests.ts'],
    include: ['tests/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['json', 'html', 'text'],
      reportsDirectory: 'coverage',
    },
  },
};
