// jest.config.js
module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  testPathIgnorePatterns: ["/node_modules/", "/build/"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["html", "text", "lcov"],
};
