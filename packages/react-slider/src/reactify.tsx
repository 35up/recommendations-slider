import {
  FC,
  RefObject,
  ForwardedRef,
  forwardRef,
  useLayoutEffect,
  useMemo,
} from 'react';


const EVENT_REGEXP = /^on[A-Z]/;
const CAPITALIZED_WORD_REGEXP = /[A-Z0-9][a-z0-9]*/g;

type TWebComponentsProps = Record<string, unknown | EventListener>;
type TPropsWithClassName = Record<string, string> & {className?: string};
type TPropsWithClass = Record<string, string> & {class?: string};
type TReactifyOptions = {
  eventMap?: Record<string, string>;
  attributeMap?: Record<string, string>;
  propMap?: Record<string, string>;
};

function normalizeClassName(
  {className, ...attrs}: TPropsWithClassName,
): TPropsWithClass {
  if (!className) return attrs;

  return {...attrs, class: className};
}

function useEnsureRef<T>(ref: ForwardedRef<T> | null): RefObject<T> {
  return useMemo(
    () => {
      const validRef: RefObject<T> = {current: null};
      if (!ref) return validRef;
      if (typeof ref === 'function') {
        ref(validRef.current);
        return validRef;
      }
      return ref;
    },
    [ref],
  );
}

export function reactify<
  TProps extends TWebComponentsProps = TWebComponentsProps,
  TComponent extends HTMLElement = HTMLElement
>(
  Tag: string,
  { eventMap = {}, attributeMap = {}, propMap = {} }: TReactifyOptions = {},
): FC<Omit<TProps, 'ref'> & { ref?: RefObject<TComponent> }> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return forwardRef<TComponent, TProps>(
    ({ children, ...originalProps }, ref) => {
      const validRef: RefObject<TComponent> = useEnsureRef(ref);

      const [ elementAttributes, elementProperties, elementEvents ] = useMemo(
        () => Object
          .entries(originalProps)
          .reduce<[
            TPropsWithClassName, [string, unknown][], [string, EventListener][]
          ]>(([ attrs, props, events ], [ key, value ]) => {
            const eventKey = eventMap[key];

            if (eventKey) {
              return [attrs, props, [...events, [eventKey, value]]];
            }

            if (EVENT_REGEXP.test(key)) {
              const words = key.match(CAPITALIZED_WORD_REGEXP);
              const computedEventKey = (words as RegExpMatchArray)
                .map(word => word.toLowerCase())
                .join('-');

              return [attrs, props, [...events, [computedEventKey, value]]];
            }

            const propKey = propMap[key];

            if (propKey) {
              return [attrs, [...props, [propKey, value]], events];
            }

            if (typeof value !== 'string') {
              return [attrs, [...props, [key, value]], events];
            }

            return [
              {
                ...attrs,
                [attributeMap[key] ?? key]: value,
              },
              props,
              events,
            ];
          }, [{}, [], []]),
        [originalProps],
      );

      useLayoutEffect(() => {
        const { current } = validRef;
        if (!current) return () => null;

        for (const [ key, value ] of elementProperties) {
          current[key] = value;
        }

        for (const [ name, listener ] of elementEvents) {
          current.addEventListener(name, listener);
        }

        return () => {
          for (const [ name, listener ] of elementEvents) {
            current.removeEventListener(name, listener);
          }
        };
      }, [validRef, elementProperties, elementEvents]);

      return (
        <Tag {...normalizeClassName(elementAttributes)} ref={validRef}>
          {children}
        </Tag>
      );
    },
  );
}

declare global {
  namespace JSX {
    interface IntrinsicAttributes {
      [attr: string]: any;
    }
  }
}
