'use client';

import { useEffect } from 'react';

declare global {
    interface Window {
        adsbygoogle: any;
    }
}

export function AdWidget() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, []);

  return (
    <div className="my-8">
        <ins className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-6208745110537063"
            data-ad-slot="1214402990"
            data-ad-format="auto"
            data-full-width-responsive="true"></ins>
    </div>
  );
}
