const { mergeConfig } = require('vite');
const { viteStaticCopy } = require('vite-plugin-static-copy');
const path = require('path');


module.exports = {
  stories: [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-essentials'
  ],
  framework: '@storybook/web-components-vite',
  core: {
    builder: '@storybook/builder-vite',
  },
  async viteFinal(config) {
    config.optimizeDeps = config.optimizeDeps || {};
    config.optimizeDeps.include = [
      ...(config.optimizeDeps?.include ?? []),
      '@storybook/web-components',
    ]
    config.optimizeDeps.exclude = [...(config.optimizeDeps?.exclude ?? []), 'lit', 'lit-html']

    return mergeConfig(config, {
      base: '/recos-slider/',
      resolve: {
        alias: [
          { find: /^lit\/([\w-/]+)$/, replacement: 'lit/$1.js' },
        ],
      },
      plugins: [
        viteStaticCopy({
          targets: [
            {
              src: path.resolve(__dirname, './logo-colorful.svg'),
              dest: path.resolve(__dirname, '../storybook-static'),
            }
          ]
        })
      ]
    });
  },
};
