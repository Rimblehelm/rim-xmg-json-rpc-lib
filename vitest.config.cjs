module.exports = {
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./tests/setupTests.ts'],
    include: ['tests/**/*.test.ts'],
  },
};
