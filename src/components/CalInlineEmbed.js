'use client';

import { useEffect, useRef } from 'react';

/**
 * Cal.com inline embed component.
 * Uses the official Cal.com embed script for the best booking experience.
 * @param {string} calLink - e.g. "mytinyhomehub/30min"
 */
export default function CalInlineEmbed({ calLink }) {
  const containerRef = useRef(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (!calLink || initialized.current) return;
    initialized.current = true;

    // Load Cal.com embed script once
    const scriptId = 'cal-embed-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://app.cal.com/embed/embed.js';
      script.async = true;
      script.onload = () => initCal(calLink, containerRef.current);
      document.head.appendChild(script);
    } else {
      // Script already loaded
      initCal(calLink, containerRef.current);
    }
  }, [calLink]);

  return (
    <div
      ref={containerRef}
      data-cal-link={calLink}
      data-cal-config='{"layout":"month_view"}'
      style={{ minHeight: 600, width: '100%' }}
    />
  );
}

function initCal(calLink, el) {
  if (typeof window === 'undefined' || !window.Cal) return;
  const Cal = window.Cal;
  Cal('init', { origin: 'https://cal.com' });
  Cal('inline', {
    elementOrSelector: el,
    calLink,
    layout: 'month_view',
  });
  Cal('ui', {
    styles: { branding: { brandColor: '#8CC540' } },
    hideEventTypeDetails: false,
    layout: 'month_view',
  });
}
