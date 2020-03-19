module.exports = {
  rootDir: './',
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
  coverageDirectory: './coverage',
  moduleDirectories: ['node_modules'],
  testURL: 'http://localhost',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
};
