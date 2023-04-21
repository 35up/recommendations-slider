import { describe, it, expect, vi } from 'vitest';
import { createRef } from 'react';
import { render } from '@testing-library/react';
import { reactify } from './reactify';

describe('reactify', () => {
  it('uses the provided tag when rendered', () => {
    const Component = reactify('span');

    const { container } = render(<Component />);

    expect(container.querySelector('span')).toBeTruthy();
  });

  it('renders children', () => {
    const Component = reactify('span');

    const { container } = render(<Component><img alt="content" /></Component>);

    expect(container.querySelector('img[alt="content"]')).toBeTruthy();
  });

  it('passes props to the element', () => {
    type TSpanProps = { name: string, hidden: boolean, 'the-other': string };
    const Component = reactify<TSpanProps>('span');

    const { container } = render(<Component name="id" hidden the-other="value" />);

    const span = container.querySelector('span');

    expect(span.getAttribute('name')).toEqual('id');
    expect(span.getAttribute('the-other')).toEqual('value');
    expect(span).toHaveProperty('hidden', true);
  });

  it('passes non-string props as property', () => {
    type TSpanProps = {obj: Record<string, number>, num: number, bool: boolean};
    const Component = reactify<TSpanProps>('span');

    const obj = {a: 1, b: 2};
    const { container } = render(<Component obj={obj} num={3} bool />);

    const span = container.querySelector('span');

    expect(span).toHaveProperty('obj', obj);
    expect(span).toHaveProperty('num', 3);
    expect(span).toHaveProperty('bool', true);
  });

  it('uses the propMap to override the property names', () => {
    type TSpanProps = {obj: Record<string, number>};
    const Component = reactify<TSpanProps>('span', {propMap: {obj: 'theObj'}});

    const obj = {a: 1, b: 2};
    const { container } = render(<Component obj={obj} />);

    const span = container.querySelector('span');

    expect(span).toHaveProperty('theObj', obj);
    expect(span).not.toHaveProperty('obj');
  });

  it('sets the prop as a property even if it is a string when present in the propMap', () => {
    type TSpanProps = {prop: string};
    const Component = reactify<TSpanProps>('span', {propMap: {prop: 'prop'}});

    const { container } = render(<Component prop="value" />);

    const span = container.querySelector('span');

    expect(span.getAttribute('prop')).toBeNull();
    expect(span).toHaveProperty('prop', 'value');
  });

  it('adds `on*` like event listeners', () => {
    type TSpanProps = {
      prop: string;
      onEvent: EventListener;
      onOtherEvent: EventListener;
    };
    const Component = reactify<TSpanProps>('span');
    const eventSpy = vi.fn();
    const otherEventSpy = vi.fn();

    const { container } = render(
      <Component
        prop="value"
        onEvent={eventSpy}
        onOtherEvent={otherEventSpy}
      >
        content
      </Component>,
    );

    const span = container.querySelector('span');

    span.dispatchEvent(new Event('onEvent'))
    span.dispatchEvent(new Event('onOtherEvent'))
    expect(eventSpy).not.toHaveBeenCalled();
    expect(otherEventSpy).not.toHaveBeenCalled();

    span.dispatchEvent(new Event('on-event'));
    span.dispatchEvent(new Event('on-other-event'));
    expect(eventSpy).not.toHaveBeenCalled();
    expect(otherEventSpy).not.toHaveBeenCalled();

    span.dispatchEvent(new Event('event'));
    span.dispatchEvent(new Event('other-event'));
    expect(eventSpy).toHaveBeenCalledOnce();
    expect(otherEventSpy).toHaveBeenCalledOnce();
  });

  it('uses the event map to get the event name to add the listen to', () => {
    type TSpanProps = {
      prop: string;
      onEvent: EventListener;
    };
    const Component = reactify<TSpanProps>(
      'span',
      {eventMap: {onEvent: 'the-event'}},
    );
    const eventSpy = vi.fn();

    const { container } = render(
      <Component prop="value" onEvent={eventSpy}>
        content
      </Component>,
    );

    const span = container.querySelector('span');

    span.dispatchEvent(new Event('event'));
    expect(eventSpy).not.toHaveBeenCalled();

    span.dispatchEvent(new Event('the-event'));
    expect(eventSpy).toHaveBeenCalledOnce();
  });

  it('converts `className` to `class`', () => {
    type TSpanProps = {className: string};
    const Component = reactify<TSpanProps>('span');

    const { container } = render(<Component className="the-class" />);

    const span = container.querySelector('span');

    expect(span.getAttribute('class')).toEqual('the-class');
    expect(span.getAttribute('className')).toBeNull();
    expect(span.getAttribute('class-name')).toBeNull();
    expect(span.getAttribute('classname')).toBeNull();
  });

  it('forwards ref to the actual element', () => {
    const Component = reactify('span');
    const ref = createRef<HTMLElement>();

    render(<Component className="the-class" ref={ref} />);

    expect(ref.current.classList.contains('the-class')).toBeTruthy();
  });
});
