import { html } from 'lit';
import { expect } from 'chai';
import sinon from 'sinon';
import { render, waitForFrame } from '@35up/tslib-test-utils-wc';
import { makeSuccess } from '@35up/tslib-utils';
import { recommendations } from '../../mock-data';
import { initialise, sdkInstance } from './__mocks__/@35up/js-sdk-browser';
import './recommendations-slider';


jest.mock('@35up/js-sdk-browser');

describe('RecommendationSlider', () => {
  beforeEach(() => {
    initialise.resetHistory();
    sdkInstance.getProductRecommendations.reset();
    sdkInstance.getProductRecommendations
      .resolves(makeSuccess(recommendations));
  });

  it('initialises the sdk and request recommendations', async () => {
    await render(html`
      <tfup-recommendations-slider
        seller="35up-test"
        language="de"
        base-product='{"title": "apple iphone 12"}'
      />
    `);

    expect(initialise).to.have.been.calledOnceWith(sinon.match({
      seller: '35up-test',
      lang: 'de',
    }));

    expect(sdkInstance.getProductRecommendations).to.have.been.calledWith(
      sinon.match({
        lang: 'de',
        baseProduct: {title: 'apple iphone 12'},
      }),
    );
  });

  it('shows shimmers while loading recommendations', async () => {
    sdkInstance.getProductRecommendations
      .callsFake(async () => {
        await waitForFrame();
        return (makeSuccess(recommendations));
      });
    const container = await render(html`
      <tfup-recommendations-slider
        seller="35up-test"
        language="de"
        base-product='{"title": "apple iphone 12"}'
      />
    `);

    expect(container.shadowRoot).to.have.descendant('up-slider .shimmer');
    expect(container.shadowRoot).to.not.have.descendant('tfup-recommendation');
  });

  it('shows recommendations', async () => {
    const container = await render(html`
      <tfup-recommendations-slider
        seller="35up-test"
        language="de"
        base-product='{"title": "apple iphone 12"}'
      />
    `);

    expect(container.shadowRoot).to.have.descendant('tfup-recommendation');
    const elements = container.shadowRoot!.querySelectorAll(
      'tfup-recommendation',
    );
    for (const [ index, element ] of elements.entries()) {
      expect(element.recommendation).to.equal(recommendations[index]);
    }
  });

  describe('when a recommendation is clicked', () => {
    describe('click event has not been canceled', () => {
      it('emits a `recommendation-click` event', async () => {
        const spy = sinon.spy();
        const container = await render(html`
        <tfup-recommendations-slider
          seller="35up-test"
          language="de"
          base-product='{"title": "apple iphone 12"}'
          @recommendation-click=${spy}
        />
      `);

        container.shadowRoot!.querySelectorAll(
          'tfup-recommendation',
        )[2]!.click();

        expect(spy).to.have.been.calledOnceWith(sinon.match({
          detail: recommendations[2],
        }));
      });
    });

    describe('click event has been canceled', () => {
      it('does not emit a `recommendation-click` event', async () => {
        const spy = sinon.spy();
        const container = await render(html`
          <tfup-recommendations-slider
            seller="35up-test"
            language="de"
            base-product='{"title": "apple iphone 12"}'
            @recommendation-click=${spy}
          />
        `);

        const clickEvent = new MouseEvent('click', {cancelable: true});
        clickEvent.preventDefault();
        container.shadowRoot!.querySelectorAll('tfup-recommendation')[2]!
          .dispatchEvent(clickEvent);

        expect(spy).to.have.not.been.called;
      });
    });
  });
});
