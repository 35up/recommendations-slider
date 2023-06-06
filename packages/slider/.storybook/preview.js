import DocsTemplate from '../src/components/recommendations-slider/recommendations-slider.mdx';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    page: DocsTemplate,
  },
}
