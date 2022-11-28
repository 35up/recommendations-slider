import { expect } from 'chai';
import sinon from 'sinon';
import { hello, me } from './index';

describe('test suite', () => {
  it('test stuff', () => {
    const spy = sinon.spy(console, 'log');
    hello(me);
    expect(spy).to.have.been.calledOnceWithExactly('hello ', me);
    spy.restore();
  });
});
