module.exports = {
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2018,
    "project": "./jsconfig.json",
    "sourceType": "module"
  },
  "plugins": ["@destinationstransfers", "@typescript-eslint"],
  "extends": [
    "plugin:@destinationstransfers/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint"
  ],
  "env": {
    "node": true,
    "browser": false
  },
  "rules": {
    "@destinationstransfers/prefer-class-properties": "off",
    "node/no-unsupported-features/es-syntax": "off",
    "node/no-unsupported-features/node-builtins": [
      "error",
      { "ignores": ["fs.promises"] }
    ],
    "import/no-unresolved": "off",
    "dependencies/no-unresolved": "off",
    "@typescript-eslint/explicit-member-accessibility": [
      "error",
      {
        "accessibility": "no-public"
      }
    ],
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/member-ordering": "error",
    "@typescript-eslint/no-use-before-define": "error",
    "@typescript-eslint/type-annotation-spacing": "error",
    "@typescript-eslint/no-extraneous-class": "error",
    "@typescript-eslint/no-non-null-assertion": "error",
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      { "allowExpressions": true, "allowTypedFunctionExpressions": true }
    ],
    "@typescript-eslint/no-object-literal-type-assertion": [
      "error",
      {
        "allowAsParameter": true // Allow type assertion in call and new expression, default false
      }
    ],
    "@typescript-eslint/no-this-alias": [
      "error",
      {
        "allowDestructuring": true // Allow `const { props, state } = this`; false by default
      }
    ],
    // note you must disable the base rule as it can report incorrect errors
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        "vars": "all",
        "args": "after-used",
        "ignoreRestSiblings": true,
        "argsIgnorePattern": "^next$",
        "caughtErrors": "none"
      }
    ],
    "@typescript-eslint/ban-types": [
      "error",
      {
        "types": {
          "Array": null,
          "Object": "Use {} instead",
          "String": {
            "message": "Use string instead",
            "fixWith": "string"
          }
        }
      }
    ],
    // requires project
    "@typescript-eslint/promise-function-async": "error",
    "@typescript-eslint/no-for-in-array": "error"
  },
  "overrides": [
    {
      "files": ["__tests__/*.ts", "__tests__/*.js", "*.test.ts", "*.test.js"],
      "env": {
        "jest": true
      },
      "rules": {
        "@typescript-eslint/no-unused-vars": "warn",
        "@typescript-eslint/explicit-function-return-type": "off"
      }
    }
  ],
  "settings": {
    "import/extensions": [".ts", ".js"],
    "import/parsers": {
      "@typescript-eslint/parser": [".ts"]
    }
  }
}

