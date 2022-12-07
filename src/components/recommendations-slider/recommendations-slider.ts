import { LitElement, html, TemplateResult } from 'lit';
import './slider';


export class RecommendationsSlider extends LitElement {
  render(): TemplateResult {
    return html`<up-slider>Recommended</up-slider>`;
  }
}

if (!window.customElements.get('up-recommendations-slider')) {
  window.customElements.define(
    'up-recommendations-slider',
    RecommendationsSlider,
  );
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'up-recommendations-slider': RecommendationsSlider;
  }
}
