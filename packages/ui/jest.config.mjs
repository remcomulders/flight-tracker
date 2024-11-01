/** @type {import('ts-jest').JestConfigWithTsJest} **/
const config = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+.tsx?$': ['ts-jest', {}],
  },
};

export default config;
