'use client';

'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/tracking';

export default function TrackingBoot() {
  useEffect(() => {
    const key = 'apexflash_page_view_home_v1';

    try {
      if (typeof window !== 'undefined' && window.sessionStorage.getItem(key)) {
        return;
      }

      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem(key, '1');
      }
    } catch {
      // sessionStorage can be unavailable in some contexts; still track once best-effort
    }

    trackEvent('page_view', { page: 'home' });
  }, []);

  return null;
}
