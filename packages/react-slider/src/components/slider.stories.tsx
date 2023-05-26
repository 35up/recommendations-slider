import type { Meta, StoryObj } from '@storybook/react';
import { Style } from 'react-style-tag';
import { RecommendationsSlider } from './slider';


const meta: Meta<typeof RecommendationsSlider> = {
  title: 'Slider',
  component: RecommendationsSlider,
  argTypes: {
    baseProduct: {control: 'object'},
    customer: {control: 'object'},
    language: {control: 'text'},
    country: {control: 'text'},
    seller: {control: 'text'},
    session: {control: 'text'},
    limit: {control: 'number'},
    apiUrl: {control: 'text'},
    onRecommendationClick: {action: 'recommendation-click'},
    onAddToCart: {action: 'add-to-cart'},
  },
  args: {
    baseProduct: {
      title: 'Apple iPhone 12 Pro - Pacific blue',
    },
    seller: '35up-test',
  },
};

export default meta;
type Story = StoryObj<typeof RecommendationsSlider>;

export const Default: Story = {};

export const CustomStyles: Story = {
  render(props) {
    return (
      <>
        <Style>{`
          .custom-slider {
            --recommendation-height: 30rem;
            font-size: 14px;
            color: #333;
          }

          .custom-slider::part(recommendation) {
            border-radius: 10px;
            background: #eaf1fb;
            padding: 10px;
          }

          .custom-slider::part(button) {
            border-radius: 999px;
            background: #d3e3fd;
          }

          .custom-slider::part(button):hover {
            background: #b4cff7;
          }

          .custom-slider::part(price) {
            font-weight: bold;
            color: #555;
          }

          .custom-slider::part(arrow) {
            color: #d3e3fd;
          }

          .custom-slider::part(arrow):hover {
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
        `}</Style>
        <RecommendationsSlider {...props} className="custom-slider">
          <button slot="arrow-left">{'<'}</button>
          <button slot="arrow-right">{'>'}</button>
        </RecommendationsSlider>
      </>
    );
  },
};
