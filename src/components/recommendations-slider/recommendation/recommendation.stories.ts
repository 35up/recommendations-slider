import { Story, Meta } from '@storybook/web-components';
import { html } from 'lit';
import { ProductRecommendation } from '@35up/js-sdk-browser';
import { recommendations } from 'mock-data';
import './recommendation';


type TProps = {
  recommendation: ProductRecommendation;
  click: EventListener;
  addToCart: EventListener;
};

export default {
  title: 'Components/Recommendation',
  argTypes: {
    recommendation: {control: 'object'},
    addToCart: {action: 'add-to-cart'},
    click: {action: 'click'},
  },
} as Meta;

export const Default: Story<TProps> = ({
  recommendation,
  click,
  addToCart,
}) => html`
  <up-recommendation
    .recommendation=${recommendation}
    @click=${click}
    @add-to-cart=${addToCart}
  >
  </up-recommendation>
`;

Default.args = {
  recommendation: recommendations[0],
};
