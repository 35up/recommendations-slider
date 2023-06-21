import type { Meta, StoryObj } from '@storybook/react';
import { waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
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

function isRecoVisible(reco: HTMLElement): boolean {
  const track = reco.parentElement;
  const recoRect = reco.getBoundingClientRect();
  const trackRect = track.getBoundingClientRect();

  return recoRect.right > trackRect.left && recoRect.left < trackRect.right;
}

export const Default: Story = {
  play: async ({ canvasElement, step }) => {
    const sliderEl = canvasElement
      .querySelector('tfup-recommendations-slider').shadowRoot;

    await waitFor(function recosLoaded() {
      expect(sliderEl.querySelector('tfup-recommendation')).toBeTruthy();
    }, {timeout: 2000});

    const [ arrowRight, arrowLeft ] = [
      sliderEl.querySelector<HTMLButtonElement>('[aria-label="arrow-right"]'),
      sliderEl.querySelector<HTMLButtonElement>('[aria-label="arrow-left"]'),
    ];
    const [ firstReco, secondReco, thirdReco ] = Array
      .from(sliderEl.querySelectorAll('tfup-recommendation'));

    await step('Slide right once', async () => {
      arrowRight.click();

      await waitFor(function firstRecoOut() {
        expect(isRecoVisible(firstReco)).toBeFalsy();
        expect(isRecoVisible(secondReco)).toBeTruthy();
      }, {timeout: 2000});
    });

    await step('Slide right twice', async () => {
      arrowRight.click();

      await waitFor(function firstRecoOut() {
        expect(isRecoVisible(firstReco)).toBeFalsy();
        expect(isRecoVisible(secondReco)).toBeFalsy();
        expect(isRecoVisible(thirdReco)).toBeTruthy();
      }, {timeout: 2000});
    });

    await step('Slide left', async () => {
      arrowLeft.click();

      await waitFor(function firstRecoIn() {
        expect(isRecoVisible(firstReco)).toBeFalsy();
        expect(isRecoVisible(secondReco)).toBeTruthy();
        expect(isRecoVisible(thirdReco)).toBeTruthy();
      });
    });
  },
};

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
