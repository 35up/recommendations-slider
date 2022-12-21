import { Story, Meta } from '@storybook/web-components';
import { html } from 'lit';

export default {
  title: 'Recommendations Slider',
  argTypes: {},
} as Meta;

export const Default: Story = () => html`
  <up-recommendations-slider></up-recommendations-slider>
`;
