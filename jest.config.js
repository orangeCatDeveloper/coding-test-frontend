module.exports = {
  setupFilesAfterEnv: ["<rootDir>/setup-jest.js"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy"
  }
};
