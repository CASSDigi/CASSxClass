import React from "react";
import { waLink } from "../lib/siteConfig.js";

export default function WhatsAppButton() {
  return (
    <a
      href={waLink("Hi CASSxClass, I need some support with my order.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with CASSxClass support on WhatsApp"
      className="fixed bottom-5 right-5 md:bottom-7 md:right-7 z-50 flex items-center justify-center
      w-14 h-14 rounded-full bg-[#25D366] shadow-lg shadow-black/20 hover:scale-105 active:scale-95
      transition-transform duration-300"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.16c-.24.68-1.4 1.3-1.93 1.37-.5.08-1.12.11-1.8-.11-.42-.13-.95-.3-1.63-.6-2.87-1.24-4.74-4.14-4.88-4.33-.14-.19-1.17-1.55-1.17-2.96 0-1.4.74-2.09 1-2.38.26-.28.57-.35.76-.35.19 0 .38 0 .55.01.18.01.42-.07.65.5.24.58.82 2 .89 2.14.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.16-.29.36-.42.49-.14.14-.28.29-.12.57.16.28.7 1.16 1.51 1.88 1.04.93 1.92 1.22 2.2 1.36.28.14.44.12.6-.07.16-.19.68-.79.86-1.06.18-.28.36-.23.6-.14.24.09 1.53.72 1.79.85.26.14.44.2.5.31.06.12.06.68-.18 1.36Z" />
      </svg>
    </a>
  );
}
