import { css, html, LitElement, TemplateResult } from 'lit';


const THRESHOLD = -20;

export class Slider extends LitElement {
  static styles = css`
    :host {
      --arrow-size: 3rem;
      display: flex;
      align-items: center;
    }

    slot {
      display: flex;
      position: relative;
      gap: 0.5rem;
      justify-content: flex-start;
      width: 100%;
      overflow: hidden;
      scroll-snap-type: x mandatory;
      scroll-behavior: smooth;
    }

    button {
      display: block;
      background: 0;
      font-size: var(--arrow-size);
      line-height: 1;
      height: var(--arrow-size);
      border: none;
      padding: 0 calc(var(--arrow-size) / 2);
    }

    button.left {
      order: -1;
      left: 0;
    }

    button.right {
      order: 1;
      right: 0;
    }
  `;

  #isChildVisible(child: Element): boolean {
    const parentRect = this.renderRoot.querySelector('slot')!
      .getBoundingClientRect();
    const childRect = child.getBoundingClientRect();

    // if the child right is after the parent left
    // and the child left is before the parent right
    return parentRect.left - childRect.right < THRESHOLD
      && parentRect.right - childRect.right > THRESHOLD;
  }

  #getNextElement(child: ChildNode | null): Element | null {
    if (!child) return null;

    let next = child.nextSibling;

    while (next && !(next instanceof Element)) {
      next = next.nextSibling;
    }

    return next;
  }

  #getPreviousElement(child: ChildNode | null): Element | null {
    if (!child) return null;

    let next = child.previousSibling;

    while (next && !(next instanceof Element)) {
      next = next.previousSibling;
    }

    return next;
  }

  #getFistVisibleElement() {
    let child = this.#getNextElement(this.firstChild ?? null);

    while (child && !(this.#isChildVisible(child))) {
      child = this.#getNextElement(child);
    }
    return child;
  }

  #getLastVisibleElement() {
    let child = this.#getPreviousElement(this.lastChild ?? null);

    while (child && !(this.#isChildVisible(child))) {
      child = this.#getPreviousElement(child);
    }
    return child;
  }

  #scrollToNext(): void {
    const child = this.#getLastVisibleElement();

    if (child) {
      this.#getNextElement(child as Element)?.scrollIntoView(true);
    }
  }

  #scrollToPrevious(): void {
    const child = this.#getFistVisibleElement();

    if (child) {
      this.#getPreviousElement(child as Element)?.scrollIntoView(true);
    }
  }

  render(): TemplateResult {
    return html`
      <style>
        ::slotted(*) {
          flex-shrink: 0;
          scroll-snap-align: start;
        }
      </style>
      <slot></slot>
      <button
        class="left"
        @click=${this.#scrollToPrevious.bind(this)}
        aria-hidden="true"
      >
        &lsaquo;
      </button>
      <button
        class="right"
        @click=${this.#scrollToNext.bind(this)}
        aria-hidden="true"
      >
        &rsaquo;
      </button>
    `;
  }
}

if (!window.customElements.get('up-slider')) {
  window.customElements.define('up-slider', Slider);
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'up-slider': Slider;
  }
}
