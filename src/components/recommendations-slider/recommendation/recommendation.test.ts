import { render } from '@35up/tslib-test-utils-wc';
import { html } from 'lit';
import { expect } from 'chai';
import { recommendations } from 'mock-data';
import sinon from 'sinon';
import './recommendation';


describe('recommendation', () => {
  const recommendation = recommendations[0];

  it('renders with product name, image and price', async () => {
    const container = await render(
      html`<up-recommendation .recommendation=${recommendation} />`,
    );

    expect(container.shadowRoot).to.have.descendant('img');
    expect(container.shadowRoot.querySelector('img')).to.have.attr(
      'src',
      recommendation.images.thumbnail,
    );
    expect(container.shadowRoot).to.contain.text(
      recommendation.price.formatted,
    );
    expect(container.shadowRoot).to.contain.text(recommendation.name);
  });

  it('has a button to add to cart', async () => {
    const container = await render(
      html`<up-recommendation .recommendation=${recommendation} />`,
    );

    expect(container.shadowRoot).to.have.descendants('button');
    const button = container.shadowRoot.querySelector('button');
    expect(button).to.contain.text('Add to Cart');
  });

  describe('button is clicked', () => {
    it('emits add-to-cart event', async () => {
      const spy = sinon.spy();
      const container = await render(html`
        <up-recommendation
          .recommendation=${recommendation}
          @add-to-cart=${spy}
        />
      `);
      container.shadowRoot.querySelector('button').click();

      expect(spy).to.have.been.calledWith(sinon.match({
        detail: recommendation,
        bubbles: true,
        composed: true,
      }));
    });
  });
});
