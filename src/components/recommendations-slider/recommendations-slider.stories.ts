import { html, render } from 'lit';
import { styleMap } from 'lit/directives/style-map';
import { ifDefined } from 'lit/directives/if-defined';
import { Meta, Story, StoryObj } from '@storybook/web-components';
import { BaseProduct, Customer } from '@35up/js-sdk-browser';
import './recommendations-slider';
import mdx from './recommendations-slider.mdx';


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
  click: EventListener,
  recommendationClick: EventListener,
  addToCart: EventListener
};

export default {
  title: 'Recommendations Slider',
  parameters: {
    docs: {
      page: mdx,
    },
    viewMode: 'docs',
    previewTabs: { 'storybook/docs/panel': { index: -1 } },
  },
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
    click: {action: 'click'},
    recommendationClick: {action: 'recommendation-click'},
    addToCart: {action: 'add-to-cart'},
  },
  args: {
    baseProduct: {
      title: 'Apple iPhone 12 Pro - Pacific blue',
    },
    seller: '35up-test',
  },
  render: ({
    baseProduct,
    customer,
    language,
    country,
    seller,
    session,
    limit,
    height,
    fontSize,
    click,
    recommendationClick,
    addToCart,
  }) => html`
    <tfup-recommendations-slider
      base-product=${JSON.stringify(baseProduct)}
      seller=${ifDefined(seller)}
      customer=${ifDefined(customer)}
      language=${ifDefined(language)}
      country=${ifDefined(country)}
      session=${ifDefined(session)}
      limit=${ifDefined(limit)}
      @click=${click}
      @recommendation-click=${recommendationClick}
      @add-to-cart=${addToCart}
      style=${styleMap({'--recommendation-height': height, 'font-size': fontSize})}
    ></tfup-recommendations-slider>
  `,
} as Meta<TProps>;


export const Default: StoryObj = {};

export const WithRecommendationsHeight: StoryObj = {
  args: {
    height: '20rem',
  },
};

export const WithFontSize: StoryObj = {
  args: {
    fontSize: '10px',
  },
};

export const FullyCustomized: Story<TProps> = ({ baseProduct }) => {
  const wrapper = document.createElement('div');
  wrapper.attachShadow({mode: 'open'});
  const recoSliderStyle = styleMap({
    '--recommendation-height': '30rem',
    'font-size': '14px',
    color: '#333',
  });
  render(
    html`
      <style>
        tfup-recommendations-slider::part(recommendation) {
          border-radius: 10px;
          background: #eaf1fb;
          padding: 10px;
        }

        tfup-recommendations-slider::part(button) {
          border-radius: 999px;
          background: #d3e3fd;
        }

        tfup-recommendations-slider::part(button):hover {
          background: #b4cff7;
        }

        tfup-recommendations-slider::part(price) {
          font-weight: bold;
          color: #555;
        }

        tfup-recommendations-slider::part(arrow) {
          color: #d3e3fd;
        }

        tfup-recommendations-slider::part(arrow):hover {
          color: #b4cff7;
        }

        button {
          margin: 0 10px;
          background: transparent;
          color: #d3e3fd;
          border: 1px solid #d3e3fd;
          border-radius: 999px;
          cursor: pointer;
        }

        button:hover {
          color: #b4cff7;
          border: 1px solid #b4cff7;
        }
      </style>
      <tfup-recommendations-slider
        base-product=${JSON.stringify(baseProduct)}
        seller="35up-test"
        style=${recoSliderStyle}
      >
        <button slot="arrow-left"><</button>
        <button slot="arrow-right">></button>
      </tfup-recommendations-slider>
    `,
    wrapper.shadowRoot as unknown as HTMLElement,
  );
  return wrapper;
};
