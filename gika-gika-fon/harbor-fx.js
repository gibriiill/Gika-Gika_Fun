import { createLiquidEther } from './liquid-ether.js';

// Fires once the harbor section exists (script.js builds the boats on
// DOMContentLoaded too, but this effect doesn't depend on the boats).
document.addEventListener('DOMContentLoaded', () => {
  const fxEl = document.getElementById('harborFx');
  if (!fxEl) return;

  // liquid-ether.js sets `container.style.position = container.style.position
  // || 'relative'` on init. Pre-set it inline so that guard is a no-op and it
  // doesn't clobber the CSS `position: absolute; inset: 0;` on .harbor-fx.
  fxEl.style.position = 'absolute';

  // Respect users who've asked for less motion.
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;
  if (prefersReducedMotion) return;

  createLiquidEther(fxEl, {
    // Ocean palette pulled from style.css's --sea-* variables.
    colors: ['#2c8478', '#175c56', '#eef4ef'],
    backgroundColor: '#0e3b3a',
    lightMode: false,
    mouseForce: 16,
    cursorSize: 140,
    resolution: 0.5,
    autoDemo: true,
    autoSpeed: 0.35,
    autoIntensity: 1.8,
    takeoverDuration: 0.3,
    autoResumeDelay: 1200,
    autoRampDuration: 0.8
  });
});
