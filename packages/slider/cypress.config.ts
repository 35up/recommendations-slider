// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'cypress';

export default defineConfig({
  screenshotOnRunFailure: false,
  e2e: {
    supportFile: false,
    specPattern: 'cypress/e2e/*.spec.*',
  },
});
