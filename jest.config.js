module.exports = {
  testEnvironment: "node",
  roots: ["<rootDir>/tests/"],
  testMatch: ["**/*.test.js"],
  collectCoverage: true,
  coverageDirectory: "coverage",
  moduleDirectories: ["node_modules", "<rootDir>"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/backend/$1",
  },
};
