import { LitElement, html, TemplateResult, PropertyValues } from 'lit';
import { repeat } from 'lit/directives/repeat';
import { choose } from 'lit/directives/choose';
import { map } from 'lit/directives/map';
import {
  makePending,
  STATUS,
  arrayRange,
  type RemoteData,
} from '@35up/tslib-utils';
import {
  type BaseProduct,
  type Customer,
  type ThirtyFiveUp,
  type ProductRecommendation,
  initialise,
} from '@35up/js-sdk-browser';
import './slider';
import './recommendation';


export class RecommendationsSlider extends LitElement {
  static properties = {
    language: {type: String},
    country: {type: String},
    seller: {type: String},
    session: {type: String},
    baseProduct: {type: Object, attribute: 'base-product'},
    customer: {type: Object},
    limit: {type: Number},
    recommendations: {state: true},
  };

  baseProduct: BaseProduct;
  customer?: Customer;
  language?: string;
  country?: string;
  seller: string;
  session?: string;
  limit?: number;
  recommendations: RemoteData<ProductRecommendation[]> = makePending();

  #tfup: ThirtyFiveUp;

  constructor() {
    super();
    this.setAttribute('role', 'list');
  }

  connectedCallback() {
    super.connectedCallback();

    this.#tfup = initialise({
      seller: this.seller,
      session: this.session,
      lang: this.language,
    });
  }

  protected async willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);

    if (
      changedProperties.size === 1
      && changedProperties.has('recommendations')
    ) return;

    this.recommendations = await this.#tfup.getProductRecommendations({
      baseProduct: this.baseProduct,
      customer: this.customer,
      country: this.country,
      lang: this.language,
      limit: this.limit,
      session: this.session,
    });
  }

  private renderRecommendations(
    recommendations: ProductRecommendation[],
  ): TemplateResult {
    return html`<up-slider>${repeat(recommendations, recommendation => html`
      <up-recommendation .recommendation=${recommendation}>
      </up-recommendation>
    `)}</up-slider>`;
  }

  private renderShimmers(): TemplateResult {
    return html`<up-slider>${map(
      arrayRange(0, this.limit ?? 10),
      () => html`<div class="shimmer" />`,
    )}</up-slider>`;
  }

  protected render(): TemplateResult {
    return html`${choose(this.recommendations.status, [
      [STATUS.PENDING, () => this.renderShimmers()],
      [STATUS.FAIL, () => html`<div>Failed to load recommendations.</div>`],
      [STATUS.SUCCESS, () => this.renderRecommendations(
        this.recommendations.data!,
      )],
    ])}
    `;
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
