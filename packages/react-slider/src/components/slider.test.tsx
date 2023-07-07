import { expect, describe, it } from 'vitest';
import { render } from '@testing-library/react';
import { RecommendationsSlider } from './slider';

describe('Slider', () => {
  it('renders', () => {
    const { container } = render(
      <RecommendationsSlider
        seller="35up-seller"
        baseProduct={{title: 'ee'}}
      />,
    );

    expect(container.querySelector('tfup-recommendations-slider')).toBeTruthy();
    expect(container.querySelector('tfup-recommendations-slider'))
      .to.have.property('sliderTrack');
  });
});
