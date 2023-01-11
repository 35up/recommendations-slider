import { Story, Meta } from '@storybook/web-components';
import { html } from 'lit';
import './recommendations-slider';


export default {
  title: 'Recommendations Slider',
  argTypes: {},
} as Meta;

export const Default: Story = () => html`
  <up-recommendations-slider style="--recommendation-height: 20rem"></up-recommendations-slider>
`;
