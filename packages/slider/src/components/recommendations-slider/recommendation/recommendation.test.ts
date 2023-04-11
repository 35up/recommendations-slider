import { render } from '@35up/tslib-test-utils-wc';
import { html } from 'lit';
import { expect } from 'chai';
import sinon from 'sinon';
import { recommendations } from '../../../mock-data';
import './recommendation';


describe('recommendation', () => {
  const recommendation = recommendations[0]!;

  it('renders with product name, image and price', async () => {
    const container = await render(
      html`<tfup-recommendation .recommendation=${recommendation} />`,
    );

    expect(container).to.have.descendant('img');
    expect(container.querySelector('img')).to.have.attr(
      'src',
      recommendation.images.thumbnail,
    );
    expect(container).to.contain.text(
      recommendation.price!.formatted,
    );
    expect(container).to.contain.text(recommendation.name);
  });

  it('has a button to add to cart', async () => {
    const container = await render(
      html`<tfup-recommendation .recommendation=${recommendation} />`,
    );

    expect(container).to.have.descendants('button');
    const button = container.querySelector('button');
    expect(button).to.contain.text('Add to Cart');
  });

  describe('button is clicked', () => {
    it('emits add-to-cart event', async () => {
      const spy = sinon.spy();
      const container = await render(html`
        <tfup-recommendation
          .recommendation=${recommendation}
          @add-to-cart=${spy}
        />
      `);
      container.querySelector('button')!.click();

      expect(spy).to.have.been.calledWith(sinon.match({
        detail: recommendation,
        bubbles: true,
        composed: true,
      }));
    });

    it('prevents default of the click event', async () => {
      const spy = sinon.spy();
      const container = await render(html`
        <tfup-recommendation
          .recommendation=${recommendation}
          @click=${spy}
          @add-to-cart=${() => null}
        />
      `);
      container.querySelector('button')!.click();

      expect(spy).to.have.been.calledOnceWith(sinon.match({
        defaultPrevented: true,
      }));
    });
  });
});
