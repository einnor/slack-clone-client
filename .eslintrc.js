module.exports = {
    "env": {
      "browser": true,
      "es6": true,
      "node": true,
      "mocha": true
    },
    "extends": "airbnb",
    "rules": {
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
      "jsx-a11y/anchor-is-valid": [ "error", {
        "components": [ "Link" ],
        "specialLink": [ "to" ],
        "aspects": [ "noHref", "invalidHref", "preferButton" ]
      }]
    },
};
