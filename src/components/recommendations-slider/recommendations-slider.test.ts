import { html } from 'lit';
import { render } from '@35up/tslib-test-utils-wc';
import './recommendations-slider';


describe('RecommendationSlider', () => {
  it('renders', async () => {
    await render(html`<up-recommendations-slider></up-recommendations-slider>`);
  });
});
