import { css, html, LitElement, TemplateResult } from 'lit';
import { ProductRecommendation } from '@35up/js-sdk-browser';


export class Recommendation extends LitElement {
  static properties = {
    recommendation: {type: Object},
  };

  static styles = css`
    :host {
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

    .img {
      max-width: 100%;
      display: flex;
      align-self: stretch;
      justify-content: center;
      align-items: center;
    }

    img {
      flex-shrink: 1;
      display: block;
      max-width: 100%;
      max-height: 100%;
    }

    h3 {
      margin: 0;
      text-overflow: ellipsis;
    }

    .price {
      align-self: self-end;
    }

    button {
      align-self: self-end;
      font-size: inherit;
      padding: 0.125em 0.4em;
    }
  `;

  recommendation: ProductRecommendation;

  #handleAddToCartClick(e: Event) {
    const customEvent = new CustomEvent('add-to-cart', {
      detail: this.recommendation,
      composed: true,
      bubbles: true,
      cancelable: true,
    });
    this.dispatchEvent(customEvent);

    if (!customEvent.defaultPrevented) {
      e.preventDefault();
    }
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
      <div class="img">
        <img aria-labelledby="title" src=${images.thumbnail}>
      </div>
      <h3 id="title">${name}</h3>
      <div class="price">${price}</div>
      <button @click=${this.#handleAddToCartClick}>Add to Cart</button>
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
