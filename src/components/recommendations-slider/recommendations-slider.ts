import { LitElement, html, TemplateResult } from 'lit';


export class RecommendationsSlider extends LitElement {
  render(): TemplateResult {
    return html`<div>Recommended</div>`;
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
