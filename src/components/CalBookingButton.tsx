'use client';

import { useEffect } from 'react';

interface CalBookingButtonProps {
  calLink: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function CalBookingButton({ calLink, children, className, style }: CalBookingButtonProps) {
  useEffect(() => {
    (async function () {
      const cal = await import("@calcom/embed-react").then(mod => mod.getCalApi);
      const api = await cal();
      api("ui", {
        styles: { branding: { brandColor: "#8CC540" } },
        hideEventTypeDetails: false,
        layout: "month_view"
      });
    })();
  }, []);

  return (
    <button
      data-cal-link={calLink}
      data-cal-config='{"layout":"month_view"}'
      className={className}
      style={style}
    >
      {children}
    </button>
  );
}
