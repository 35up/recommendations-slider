import { defineConfig } from 'cypress';
import { exec } from 'child_process';

export default defineConfig({
  screenshotOnRunFailure: false,
  e2e: {
    supportFile: false,
    setupNodeEvents(on) {
      on('before:run', () => {
        exec('npm run storybook -- --ci');
      });
    },
  },
});
