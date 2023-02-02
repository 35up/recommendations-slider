// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'cypress';
import { exec } from 'child_process';

export default defineConfig({
  screenshotOnRunFailure: false,
  e2e: {
    supportFile: false,
    specPattern: 'cypress/e2e/*.spec.*',
    setupNodeEvents(on) {
      on('before:run', () => {
        exec('npm run storybook -- --ci');
      });
    },
  },
});
