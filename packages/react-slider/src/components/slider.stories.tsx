import type { Meta, StoryObj } from '@storybook/react';
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
