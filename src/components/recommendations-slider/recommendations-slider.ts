import { LitElement, html, TemplateResult, PropertyValues, css } from 'lit';
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
import { recommendationCss } from './recommendation';


const THRESHOLD = -20;

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
      background: 0;
      font-size: var(--arrow-size);
      line-height: 1;
      height: var(--arrow-size);
      border: none;
      padding: 0 calc(var(--arrow-size) / 2);
    }
  `];

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

  get sliderTrack(): HTMLElement | null {
    return this.renderRoot.querySelector('.slider-track');
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

  #scrollToNext(): void {
    const child = this.#getFistVisibleElement();

    if (!child) return;

    const nextElement = this.#getNextElement(child);

    if (!nextElement) return;

    this.#scrollTo(nextElement);
  }

  #scrollToPrevious(): void {
    const child = this.#getFistVisibleElement();

    if (!child) return;

    const previousElement = this.#getPreviousElement(child);

    if (!previousElement) return;


    this.#scrollTo(previousElement);
  }

  private renderSlider(slides: TemplateResult): TemplateResult {
    return html`
      <div class="slider">
        <button
          class="arrow"
          @click=${this.#scrollToPrevious.bind(this)}
          aria-hidden="true"
          part="arrow"
        >
          &lsaquo;
        </button>
        <div class="slider-track">
          ${slides}
        </div>
        <button
          class="arrow"
          @click=${this.#scrollToNext.bind(this)}
          aria-hidden="true"
          part="arrow"
        >
          &rsaquo;
        </button>
      </div>
    `;
  }

  private renderRecommendation(
    recommendation: ProductRecommendation,
  ): TemplateResult {
    const handleRecommendationClick = (e: Event) => {
      if (!e.defaultPrevented) {
        this.dispatchEvent(
          new CustomEvent(
            'recommendation-click',
            {detail: recommendation},
          ),
        );
      }
    };

    return html`
      <tfup-recommendation
        part="recommendation"
        .recommendation=${recommendation}
        @click=${handleRecommendationClick}>
      </tfup-recommendation>
    `;
  }

  private renderShimmers(): TemplateResult {
    return this.renderSlider(html`${map(
      arrayRange(0, this.limit ?? 10),
      () => html`<div class="shimmer" />`,
    )}`);
  }

  protected render(): TemplateResult {
    return html`${choose(this.recommendations.status, [
      [STATUS.PENDING, () => this.renderShimmers()],
      [STATUS.FAIL, () => html`<div>Failed to load recommendations.</div>`],
      [STATUS.SUCCESS, () => this.renderSlider(html`${repeat(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.recommendations.data!,
        this.renderRecommendation.bind(this),
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
