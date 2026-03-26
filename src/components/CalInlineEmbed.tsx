'use client';

import { useEffect, useRef } from 'react';

interface CalInlineEmbedProps {
  calLink: string;
}

export default function CalInlineEmbed({ calLink }: CalInlineEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (!calLink || initialized.current) return;
    initialized.current = true;

    const scriptId = 'cal-embed-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://app.cal.com/embed/embed.js';
      script.async = true;
      script.onload = () => initCal(calLink, containerRef.current);
      document.head.appendChild(script);
    } else {
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

function initCal(calLink: string, el: HTMLElement | null) {
  if (typeof window === 'undefined' || !(window as any).Cal) return;
  const Cal = (window as any).Cal;
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
