module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    env: {
        node: true,
        jest: true
    },
    plugins: [
        '@typescript-eslint',
        'jest'
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',

        'semi': 'error',
        'no-extra-semi': 'warn',
        'eol-last': 'warn',
        'no-var': 'error',
        'indent': ['error', 4 ],
        'linebreak-style': ['error', 'unix'],
        'space-in-parens': ['error', 'never'],
        'no-trailing-spaces': 'warn',
        'quotes': ['error', 'single'],

        'object-curly-spacing': ['error', 'always'],
        'key-spacing': ['error', { 'beforeColon': false, 'afterColon': true }],
        'comma-style': ['error', 'last'],
        'comma-dangle': ['error', {
            'arrays': 'never',
            'objects': 'never',
            'imports': 'never',
            'exports': 'never',
            'functions': 'never'
        }],

        'array-bracket-spacing': ['error', 'always'],
    }
};
