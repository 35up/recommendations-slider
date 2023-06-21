import { LitElement, html, TemplateResult, PropertyValues, css } from 'lit';
import { repeat } from 'lit/directives/repeat';
import { choose } from 'lit/directives/choose';
import { map } from 'lit/directives/map';
import {
  type BaseProduct,
  type Customer,
  type ThirtyFiveUp,
  type ProductRecommendation,
  initialise,
} from '@35up/js-sdk-browser';
import { recommendationCss } from './recommendation';
import { arrow } from './arrow';
import { sendTrackingEvent, TRACKING_EVENTS } from '../../services/tracking';


const THRESHOLD = -20;
type TStatus = 'pending' | 'success' | 'error';

export class RecommendationsSlider extends LitElement {
  static properties = {
    language: {type: String},
    country: {type: String},
    seller: {type: String},
    session: {type: String},
    baseProduct: {type: Object, attribute: 'base-product'},
    customer: {type: Object},
    limit: {type: Number},
    disableTracking: {type: Boolean, attribute: 'disable-tracking'},
    apiUrl: {type: String, attribute: 'api-url'},
    recommendations: {state: true},
    error: {state: true},
  };

  static styles = [recommendationCss, css`
    :host {
      --recommendation-height: 25em;
      --color-shimmer: rgba(191, 191, 191, 0.2);
      --color-shimmer-light: rgba(212, 212, 212, 0.1);
      --arrow-size: 3rem;
    }

    .shimmer {
      height: var(--recommendation-height);
      max-height: 30em;
      width: 15em;
      animation: 2s cubic-bezier(0.4, 0, 0.2, 1) 0.5s infinite shimmer;
      background: linear-gradient(to right,
      var(--color-shimmer-light) 0%,
      var(--color-shimmer) 50%,
      var(--color-shimmer-light) 100%);
    }

    @keyframes shimmer {
      0% {
        background-position: -30em 0;
      }
      100% {
        background-position: 30em 0;
      }
    }

    .slider {
      display: flex;
      align-items: center;
    }

    .slider .slider-track {
      display: flex;
      position: relative;
      gap: 1rem;
      justify-content: flex-start;
      width: 100%;
      overflow: auto;
      scroll-snap-type: x mandatory;
      scroll-behavior: smooth;
      scrollbar-width: none;
    }

    .slider .slider-track::-webkit-scrollbar {
      display: none;
    }

    .slider .slider-track > * {
      flex-shrink: 0;
      scroll-snap-align: start;
    }

    .slider .arrow {
      display: block;
      flex: 0 0 var(--arrow-size);
      background: 0;
      font-size: var(--arrow-size);
      height: var(--arrow-size);
      border: none;
      cursor: pointer;
    }

    .slider .arrow svg {
      width: 1em;
      height: 1em;
    }

    .slider .arrow.right svg {
      transform: rotate(0.5turn);
    }

  `];

  baseProduct: BaseProduct;
  customer?: Customer;
  language?: string;
  country?: string;
  seller: string;
  session?: string;
  limit?: number;
  apiUrl?: string;
  disableTracking = false;
  recommendations: [TStatus, ProductRecommendation[]] = ['pending', []];

  #tfup: ThirtyFiveUp;

  get sliderTrack(): HTMLElement | null {
    return this.renderRoot.querySelector('.slider-track');
  }

  connectedCallback() {
    super.connectedCallback();

    this.setAttribute('role', 'list');
    this.#tfup = initialise({
      seller: this.seller,
      session: this.session,
      lang: this.language,
      apiUrl: this.apiUrl,
    });
  }

  protected async willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);

    if (
      changedProperties.size === 1
      && changedProperties.has('recommendations')
    ) return;

    try {
      this.recommendations = [
        'success',
        await this.#tfup.getProductRecommendations({
          baseProduct: this.baseProduct,
          customer: this.customer,
          country: this.country,
          lang: this.language,
          limit: this.limit,
          session: this.session,
        }),
      ];
    } catch {
      this.recommendations = ['error', []];
    }
  }

  #isSlideVisible(slide: HTMLElement): boolean {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const trackRect = this.sliderTrack!.getBoundingClientRect();
    const slideRect = slide.getBoundingClientRect();

    // if the slide right is after the track left
    // and the slide left is before the track right
    return trackRect.left - slideRect.right < THRESHOLD
      && trackRect.right - slideRect.right > THRESHOLD;
  }

  #getNextElement(child: ChildNode | null): HTMLElement | null {
    if (!child) return null;

    let next = child.nextSibling;

    while (next && !(next instanceof HTMLElement)) {
      next = next.nextSibling;
    }

    return next;
  }

  #getPreviousElement(child: ChildNode | null): HTMLElement | null {
    if (!child) return null;

    let next = child.previousSibling;

    while (next && !(next instanceof HTMLElement)) {
      next = next.previousSibling;
    }

    return next;
  }

  #getFistVisibleElement() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    let slide = this.#getNextElement(this.sliderTrack!.firstChild ?? null);

    while (slide && !(this.#isSlideVisible(slide))) {
      slide = this.#getNextElement(slide);
    }
    return slide;
  }

  #scrollTo(element: HTMLElement): void {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const track = this.sliderTrack!;
    const elementPosition = element.getBoundingClientRect().left;
    const trackPosition = track.getBoundingClientRect().left;
    const left = elementPosition - (trackPosition - track.scrollLeft);

    track.scrollTo({left});
  }

  #scrollToNext = (): void => {
    this.#trackEvent(TRACKING_EVENTS.ARROW_CLICK, 'right');

    const child = this.#getFistVisibleElement();
    if (!child) return;

    const nextElement = this.#getNextElement(child);
    if (!nextElement) return;

    this.#scrollTo(nextElement);
  };

  #scrollToPrevious = (): void => {
    this.#trackEvent(TRACKING_EVENTS.ARROW_CLICK, 'left');

    const child = this.#getFistVisibleElement();
    if (!child) return;

    const previousElement = this.#getPreviousElement(child);
    if (!previousElement) return;


    this.#scrollTo(previousElement);
  };

  #trackEvent(...args: Parameters<typeof sendTrackingEvent>): void {
    if (!this.disableTracking) {
      sendTrackingEvent(...args);
    }
  }

  #makeRecommendationTrackingPayload(recommendation: ProductRecommendation) {
    return {sku: recommendation.sku, vendorId: recommendation.vendor.id};
  }

  private renderSlider(slides: TemplateResult): TemplateResult {
    return html`
      <div class="slider">
        ${this.renderLeftArrow()}
        <div class="slider-track">
          ${slides}
        </div>
        ${this.renderRightArrow()}
      </div>
    `;
  }

  private renderLeftArrow(): TemplateResult {
    const hasLeftArrow = this.querySelector('[slot="arrow-left"]');

    return hasLeftArrow
      ? html`<slot name="arrow-left" @click=${this.#scrollToPrevious}></slot>`
      : html`
        <button
          class="arrow"
          @click=${this.#scrollToPrevious}
          aria-label="arrow-left"
          part="arrow"
        >
          ${arrow}
        </button>
      `;
  }

  private renderRightArrow(): TemplateResult {
    const hasRightArrow = this.querySelector('[slot="arrow-right"]');

    return hasRightArrow
      ? html`<slot name="arrow-right" @click=${this.#scrollToNext}></slot>`
      : html`
        <button
          class="arrow right"
          @click=${this.#scrollToNext}
          aria-label="arrow-right"
          part="arrow"
        >
          ${arrow}
        </button>
      `;
  }

  private renderRecommendation = (
    recommendation: ProductRecommendation,
  ): TemplateResult => {
    const handleRecommendationClick = (e: Event) => {
      this.#trackEvent(
        TRACKING_EVENTS.RECOMMENDATION_CLICK,
        this.#makeRecommendationTrackingPayload(recommendation),
      );

      if (!e.defaultPrevented) {
        this.dispatchEvent(
          new CustomEvent(
            'recommendation-click',
            {detail: recommendation},
          ),
        );
      }
    };

    const handleAddToCartClick = () => {
      this.#trackEvent(
        TRACKING_EVENTS.CART_CLICK,
        this.#makeRecommendationTrackingPayload(recommendation),
      );
    };

    return html`
      <tfup-recommendation
        part="recommendation"
        exportparts="title,price,button"
        .recommendation=${recommendation}
        @click=${handleRecommendationClick}
        @add-to-cart=${handleAddToCartClick}
      ></tfup-recommendation>
    `;
  };

  private renderShimmers(): TemplateResult {
    return this.renderSlider(html`${map(
      new Array(this.limit ?? 10).fill(0),
      () => html`<div class="shimmer" />`,
    )}`);
  }

  protected render(): TemplateResult {
    return html`${choose(this.recommendations[0], [
      ['pending', () => this.renderShimmers()],
      ['error', () => html`<div>Failed to load recommendations.</div>`],
      ['success', () => this.renderSlider(html`${repeat(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.recommendations[1],
        this.renderRecommendation,
      )}`)],
    ])}
    `;
  }
}

if (!window.customElements.get('tfup-recommendations-slider')) {
  window.customElements.define(
    'tfup-recommendations-slider',
    RecommendationsSlider,
  );
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'tfup-recommendations-slider': RecommendationsSlider;
  }
}
