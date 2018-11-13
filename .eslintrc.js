module.exports = {
  "plugins": [
    "react-native",
  ],
  "parser": "babel-eslint",
  "extends": "airbnb",
  "rules": {
    "react/prefer-stateless-function": [0, { "ignorePureComponents": "true" }],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
  },
};