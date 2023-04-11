import { expect } from 'chai';
import { sendTrackingEvent } from './tracking';
import { TRACKING_EVENTS } from './tracking-types';


describe('services - tracking', () => {
  describe('sendTrackingEvent', () => {
    it('returns en empty promise', async () => {
      const promise = sendTrackingEvent(TRACKING_EVENTS.ARROW_CLICK, 'prev');

      expect(promise).to.be.an.instanceOf(Promise);

      const res = await promise;

      expect(res).to.be.undefined;
    });
  });
});
