import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map';
import { ifDefined } from 'lit/directives/if-defined';
import { Story, Meta } from '@storybook/web-components';
import { BaseProduct, Customer } from '@35up/js-sdk-browser';
import './recommendations-slider';


type TProps = {
  baseProduct: BaseProduct;
  customer?: Customer;
  language?: string;
  country?: string;
  seller: string;
  session?: string;
  limit?: number;
  height?: string;
  fontSize?: string;
};

export default {
  title: 'Recommendations Slider',
  argTypes: {
    baseProduct: {control: 'object'},
    customer: {control: 'object'},
    language: {control: 'text'},
    country: {control: 'text'},
    seller: {control: 'text'},
    session: {control: 'text'},
    limit: {control: 'number'},
    height: {control: 'text', name: 'Recommendations Height'},
    fontSize: {control: 'text', name: 'Font Size'},
  },
  args: {
    baseProduct: {
      title: 'Apple iPhone 12 Pro - Pacific blue',
    },
    seller: '35up-test',
  },
} as Meta<TProps>;
export const Default: Story<TProps> = ({
  baseProduct,
  customer,
  language,
  country,
  seller,
  session,
  limit,
  height,
  fontSize,
}) => html`
  <up-recommendations-slider
    base-product=${JSON.stringify(baseProduct)}
    seller=${ifDefined(seller)}
    customer=${ifDefined(customer)}
    language=${ifDefined(language)}
    country=${ifDefined(country)}
    session=${ifDefined(session)}
    limit=${ifDefined(limit)}
    style=${styleMap({'--recommendation-height': height, 'font-size': fontSize})}
  ></up-recommendations-slider>
`;

export const WithRecommendationsHeight: Story<TProps> = Default.bind(undefined);
WithRecommendationsHeight.args = {
  height: '20rem',
};

export const WithFontSize: Story<TProps> = Default.bind(undefined);
WithFontSize.args = {
  fontSize: '10px',
};
