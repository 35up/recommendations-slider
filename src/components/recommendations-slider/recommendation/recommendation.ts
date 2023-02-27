import { css, html, LitElement, TemplateResult } from 'lit';
import { ProductRecommendation } from '@35up/js-sdk-browser';


export const recommendationCss = css`
  tfup-recommendation {
    position: relative;
    display: grid;
    gap: 0.5em;
    height: var(--recommendation-height, 25em);
    max-height: 30em;
    width: 15em;
    max-width: 100%;
    align-items: start;
    grid-template:
      "image" minmax(5em, 25fr)
      "title" minmax(2.5em, 5fr)
      "price" auto
      "actions" auto
      / min(100%, 15em);
  }

  tfup-recommendation .img-wrapper {
    max-width: 100%;
    display: flex;
    align-self: stretch;
    justify-content: center;
    align-items: center;
  }

  tfup-recommendation .img {
    flex-shrink: 1;
    display: block;
    max-width: 100%;
    max-height: 100%;
  }

  tfup-recommendation #title {
    margin: 0;
    text-overflow: ellipsis;
  }

  tfup-recommendation .price {
    align-self: self-end;
  }

  tfup-recommendation .btn {
    align-self: self-end;
    font-size: inherit;
    padding: 0.125em 0.4em;
    cursor: pointer;
  }
`;

export class Recommendation extends LitElement {
  static properties = {
    recommendation: {type: Object},
  };

  createRenderRoot() {
    return this;
  }

  recommendation: ProductRecommendation;

  #handleAddToCartClick(e: Event) {
    this.dispatchEvent(new CustomEvent('add-to-cart', {
      detail: this.recommendation,
      composed: true,
      bubbles: true,
      cancelable: false,
    }));
    e.preventDefault();
  }

  constructor() {
    super();
    this.setAttribute('role', 'listitem');
  }

  render(): TemplateResult {
    const {
      images,
      name,
      price: { formatted: price } = {},
    } = this.recommendation;

    return html`
      <div class="img-wrapper">
        <img class="img" aria-labelledby="title" src=${images.thumbnail}>
      </div>
      <h3 id="title" part="title">${name}</h3>
      <div class="price" part="price">${price}</div>
      <button class="btn" @click=${this.#handleAddToCartClick} part="button">
        Add to Cart
      </button>
    `;
  }
}

if (!window.customElements.get('tfup-recommendation')) {
  window.customElements.define('tfup-recommendation', Recommendation);
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'tfup-recommendation': Recommendation;
  }
}
