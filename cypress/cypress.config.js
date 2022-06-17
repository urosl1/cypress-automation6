const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://gallery-app.vivifyideas.com',
    env: {
      VALID_USER_EMAIL: 'mikekay@gmail.com',
      VALID_USER_PASSWORD: '12345678'
    },

    // implement node event listeners here
  },
});

