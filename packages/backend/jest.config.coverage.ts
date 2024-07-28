
export default {
  clearMocks: false, // Limpa mocks entre testes
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/'],
  coverageProvider: 'v8',
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,

  transform: {
    '^.+\\.ts$': 'ts-jest',
  },

}
