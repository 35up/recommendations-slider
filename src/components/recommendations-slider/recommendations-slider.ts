import { LitElement, html, TemplateResult } from 'lit';
import { repeat } from 'lit/directives/repeat';

import { recommendations } from 'mock-data';
import './slider';
import './recommendation';


export class RecommendationsSlider extends LitElement {
  constructor() {
    super();
    this.setAttribute('role', 'list');
  }

  render(): TemplateResult {
    return html`<up-slider>${repeat(recommendations, recommendation => (
      html`<up-recommendation .recommendation=${recommendation}></up-recommendation>`
    ))}</up-slider>`;
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
