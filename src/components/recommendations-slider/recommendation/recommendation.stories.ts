import { Story, Meta } from '@storybook/web-components';
import { html } from 'lit';
import { ProductRecommendation } from '@35up/js-sdk';
import { recommendations } from 'mock-data';
import './recommendation';


export default {
  title: 'Components/Recommendation',
  argTypes: {
    recommendation: {control: 'object'},
  },
} as Meta;

export const Default: Story<{recommendation: ProductRecommendation}> = ({
  recommendation,
}) => html`
  <up-recommendation .recommendation=${recommendation}></up-recommendation>
`;

Default.args = {
  recommendation: recommendations[0],
};
