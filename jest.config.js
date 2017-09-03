module.exports = {
    "transform": {
      ".(ts|tsx)": "<rootDir>/node_modules/ts-jest/preprocessor.js"
    },
    "moduleNameMapper": {
      "^vue$": "<rootDir>/node_modules/vue/dist/vue.common.js",
      "\\.(scss)$": "identity-obj-proxy"
    },
    "testRegex": "(\\.(test))\\.(ts|tsx|js)$",
    "moduleFileExtensions": [
      "ts",
      "tsx",
      "js",
      "json"
    ]
  }
