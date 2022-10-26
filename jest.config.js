/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@actnowcoalition/(.*)$": "<rootDir>/packages/$1/src",
  },
};
