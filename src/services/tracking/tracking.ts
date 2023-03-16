import { TRACKING_EVENTS } from './tracking-types';

export async function sendTrackingEvent(
  event: TRACKING_EVENTS,
  payload?: unknown,
): Promise<void> {
  try {
    await Promise.resolve(JSON.stringify({event, payload}));
  } catch (e) {
    console.error(e);
  }
}
