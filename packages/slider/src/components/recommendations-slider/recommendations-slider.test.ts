// eslint-disable-next-line import/no-extraneous-dependencies
import { describe } from '@jest/globals';
import { html } from 'lit';
import { expect } from 'chai';
import sinon from 'sinon';
import { render, waitForFrame } from '@35up/tslib-test-utils-wc';
import { recommendations } from '../../mock-data';
import { initialise, sdkInstance } from './__mocks__/@35up/js-sdk-browser';
import { sendTrackingEvent, TRACKING_EVENTS } from '../../services/tracking';
import './recommendations-slider';


jest.mock('@35up/js-sdk-browser');
jest.mock('../../services/tracking/tracking');
const sendTrackingEventMock = sendTrackingEvent as sinon.SinonStub;

describe('RecommendationSlider', () => {
  beforeEach(() => {
    initialise.resetHistory();
    sdkInstance.getProductRecommendations.reset();
    sdkInstance.getProductRecommendations.resolves(recommendations);
    sendTrackingEventMock.resetHistory();
    sendTrackingEventMock.resolves();
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
        return recommendations;
      });
    const container = await render(html`
      <tfup-recommendations-slider
        seller="35up-test"
        language="de"
        base-product='{"title": "apple iphone 12"}'
      />
    `);

    expect(container.shadowRoot).to.have.descendant('.slider .shimmer');
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
    expect(container.shadowRoot).to.not.have.descendant('.slider .shimmer');
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

  describe('tracking', () => {
    const defaultTemplate = html`
      <tfup-recommendations-slider
        seller="35up-test"
        language="de"
        base-product='{"title": "apple iphone 12"}'
      />
    `;
    const disabledTrackingTemplate = html`
      <tfup-recommendations-slider
        seller="35up-test"
        language="de"
        base-product='{"title": "apple iphone 12"}'
        disable-tracking
      />
    `;

    describe.each([
      [false, defaultTemplate],
      [true, disabledTrackingTemplate],
    ])('when disable-tracking is set to %s', (isTrackingDisabled, template) => {
      const titleVerb = `does${isTrackingDisabled ? ' not' : ''}`;

      it(`${titleVerb} collect data on recommendation click`, async () => {
        const index = 3;
        const reco = recommendations[index]!;
        const container = await render(template);

        container.shadowRoot!.querySelectorAll(
          'tfup-recommendation',
        )[index]!.click();

        if (!isTrackingDisabled) {
          expect(sendTrackingEventMock).to.have.been.calledOnceWith(
            TRACKING_EVENTS.RECOMMENDATION_CLICK,
            {sku: reco.sku, vendorId: reco.vendor.id},
          );
        } else {
          expect(sendTrackingEventMock).to.have.not.been.called;
        }
      });

      it(`${titleVerb} collect data on add-to-cart click`, async () => {
        const index = 4;
        const reco = recommendations[index]!;
        const container = await render(template);

        container.shadowRoot!.querySelectorAll<HTMLButtonElement>(
          'tfup-recommendation button',
        )[index]!.dispatchEvent(new Event('click'));

        if (!isTrackingDisabled) {
          expect(sendTrackingEventMock).to.have.been.calledOnceWith(
            TRACKING_EVENTS.CART_CLICK,
            {sku: reco.sku, vendorId: reco.vendor.id},
          );
        } else {
          expect(sendTrackingEventMock).to.have.not.been.called;
        }
      });

      it(`${titleVerb} collect data on left-arrow click`, async () => {
        const container = await render(template);

        container.shadowRoot!.querySelectorAll<HTMLButtonElement>(
          '.arrow',
        )[0]!.click();

        if (!isTrackingDisabled) {
          expect(sendTrackingEventMock)
            .to.have.been.calledOnceWith(TRACKING_EVENTS.ARROW_CLICK, 'left');
        } else {
          expect(sendTrackingEventMock).to.have.not.been.called;
        }
      });

      it(`${titleVerb} collect data on right-arrow click`, async () => {
        const container = await render(template);

        container.shadowRoot!.querySelectorAll<HTMLButtonElement>(
          '.arrow',
        )[1]!.click();

        if (!isTrackingDisabled) {
          expect(sendTrackingEventMock)
            .to.have.been.calledOnceWith(TRACKING_EVENTS.ARROW_CLICK, 'right');
        } else {
          expect(sendTrackingEventMock).to.have.not.been.called;
        }
      });

      describe('when custom arrows are provided', () => {
        const customArrowsTemplate = html`
          <tfup-recommendations-slider
            seller="35up-test"
            language="de"
            base-product='{"title": "apple iphone 12"}'
            ?disable-tracking=${isTrackingDisabled}
          >
            <button slot="arrow-left"><</button>
            <button slot="arrow-right">></button>
          </tfup-recommendations-slider>
        `;

        it(`${titleVerb} collect data on custom left-arrow click`, async () => {
          const container = await render(customArrowsTemplate);

          container.querySelector<HTMLButtonElement>(
            '[slot="arrow-left"]',
          )!.click();

          if (!isTrackingDisabled) {
            expect(sendTrackingEventMock)
              .to.have.been.calledOnceWith(TRACKING_EVENTS.ARROW_CLICK, 'left');
          } else {
            expect(sendTrackingEventMock).to.have.not.been.called;
          }
        });

        it(`${titleVerb} collect data on custom right-arrow click`, async () => {
          const container = await render(customArrowsTemplate);

          container.querySelector<HTMLButtonElement>(
            '[slot="arrow-right"]',
          )!.click();

          if (!isTrackingDisabled) {
            expect(sendTrackingEventMock).to.have.been
              .calledOnceWith(TRACKING_EVENTS.ARROW_CLICK, 'right');
          } else {
            expect(sendTrackingEventMock).to.have.not.been.called;
          }
        });
      });
    });
  });
});
