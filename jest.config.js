module.exports={
    transform: {
        "^.+\\.ts?$": "<rootDir>/node_modules/ts-jest/preprocessor.js"
      },
      testMatch: ["**/__tests__/**/*.test.(ts|tsx|js|jsx)"],
      moduleFileExtensions: [
        "ts",
        "tsx",
        "js",
        "json"
      ]
}