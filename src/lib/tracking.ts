export interface TrackingPayload {
  [key: string]: string | number | boolean | null | undefined;
}

export function trackEvent(event: string, payload: TrackingPayload = {}) {
  const body = JSON.stringify({ event, payload });

  try {
    if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
      const blob = new Blob([body], { type: 'application/json' });
      navigator.sendBeacon('/api/events', blob);
      return;
    }
  } catch {
    // fallback to fetch below
  }

  void fetch('/api/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    keepalive: true,
  }).catch(() => {});
}
